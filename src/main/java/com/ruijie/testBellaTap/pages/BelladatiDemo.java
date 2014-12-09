package com.ruijie.testBellaTap.pages;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import org.apache.tapestry5.annotations.*;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.apache.tapestry5.services.Request;
import org.apache.tapestry5.services.Session;
import org.springframework.beans.factory.annotation.Autowired;

import com.belladati.sdk.BellaDati;
import com.belladati.sdk.BellaDatiConnection;
import com.belladati.sdk.BellaDatiService;
import com.belladati.sdk.auth.OAuthRequest;
import com.belladati.sdk.dashboard.DashboardInfo;
import com.belladati.sdk.dataset.DataSet;
import com.belladati.sdk.dataset.DataSetInfo;
import com.belladati.sdk.report.ReportInfo;
import com.belladati.sdk.util.PaginatedIdList;

public class BelladatiDemo {
	private static final String SESSION_SERVICE_ATTRIBUTE = "BellaDatiService";
	private static final String SESSION_OAUTH_ATTRIBUTE = "pendingOAuth";
	private final BellaDatiConnection connection = BellaDati.connect();
	
	@Property
	@Persist
	private DataSet dataset;
	
	@Property
	private int a;
	
	@Property
	@SessionAttribute(SESSION_OAUTH_ATTRIBUTE)
	private OAuthRequest request;
	
	//@Property
	//@SessionAttribute(SESSION_SERVICE_ATTRIBUTE)
	//BellaDatiService service;
	
	@SessionAttribute("testStr")
	String str1="";
	
	@Inject
	private Request request1;
	
	@Persist
	private Session session;
	
	@Property
	private BellaDatiService s2;
	
	@Property
	@Persist
	private String s1;
	
	@Property
	private DashboardInfo _dbi;
	
	@Property
	private ReportInfo _rpi;
	
	@Property
	private DataSetInfo _dsi;
	
	private String getDeploymentUrl(HttpServletRequest request) {
		String requestUrl = request.getRequestURL().toString();
		String servletPath = request.getServletPath();
		return requestUrl.substring(0, requestUrl.length() - servletPath.length());
	}
	
	public OAuthRequest initiateOAuth(String redirectUrl) {
		//OAuthRequest request = connection.oAuth("techKey", "techSecret", redirectUrl);
		request = connection.oAuth("techKey", "techSecret", "http://localhost:8080/testBellaTap/belladatidemo.authorize");
		//service = request.requestAccess();
		//session.setAttribute(SESSION_OAUTH_ATTRIBUTE, request);
		//s1=(BellaDatiService)request1.getSession(false).getAttribute(SESSION_SERVICE_ATTRIBUTE);
		str1="311aa";
		//s1=(String)session.getAttribute("testStr");
		s1=request1.getPath();
		return request;
	}
	
	URL onActionFromLogin(){
		//return new URL("https://service.belladati.com/authorizeRequestToken/d38a2deeaecc85d75e37cc47893a08d8/techKey");
		OAuthRequest req=initiateOAuth(null);
		return req.getAuthorizationUrl();
	}
	
	void onActionFromLogout(){
		storeService(null);
	}
	
	public BellaDatiService getService() {
		return (BellaDatiService) session.getAttribute(SESSION_SERVICE_ATTRIBUTE);
	}
	
	public boolean getLoggedIn(){
		return session.getAttribute(SESSION_SERVICE_ATTRIBUTE)!=null;
		//return dataset!=null;
	}
	
//	void onActionFromShowDataset(){
//		String datasetId="18812";
//		BellaDatiService service = ((OAuthRequest)session.getAttribute(SESSION_OAUTH_ATTRIBUTE)).requestAccess();
//		session.setAttribute(SESSION_SERVICE_ATTRIBUTE, service);
//		dataset=((BellaDatiService)session.getAttribute(SESSION_SERVICE_ATTRIBUTE)).loadDataSet(datasetId);
//	}
	
	URL onActionFromAuthorize(){
		BellaDatiService service = ((OAuthRequest)session.getAttribute(SESSION_OAUTH_ATTRIBUTE)).requestAccess();
		storeService(service);
		try {
			URL redir=new URL("http://localhost:8080/testBellaTap/belladatidemo");
			return redir;
		}
		catch (MalformedURLException ex){
			ex.printStackTrace();
			return null;
		}
	}
	
	public List<DashboardInfo> getDashboardInfo(){
		BellaDatiService service=getService();
		if (service!=null)
			return service.getDashboardInfo().load().toList();
		return null;
	}
	
	public List<ReportInfo> getReportInfo(){
		BellaDatiService service=getService();
		if (service!=null)
			return service.getReportInfo().load().toList();
		return null;
	}
	
	public List<DataSetInfo> getDataSetInfo(){
		BellaDatiService service=getService();
		if (service!=null)
			return service.getDataSetInfo().load().toList();
		return null;
	}
	
	private void storeService(BellaDatiService service) {
		session.setAttribute(SESSION_SERVICE_ATTRIBUTE, service);
	}
	
	@BeginRender
	void doBeginRender() {
		a=10;
		session=request1.getSession(true);
	}
}
