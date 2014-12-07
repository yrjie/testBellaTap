package com.ruijie.testBellaTap.pages;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import org.apache.tapestry5.annotations.*;

import com.belladati.sdk.BellaDati;
import com.belladati.sdk.BellaDatiConnection;
import com.belladati.sdk.BellaDatiService;
import com.belladati.sdk.auth.OAuthRequest;
import com.belladati.sdk.dataset.DataSet;

public class BelladatiDemo {
	private static final String SESSION_SERVICE_ATTRIBUTE = "BellaDatiService";
	private static final String SESSION_OAUTH_ATTRIBUTE = "pendingOAuth";
	private final BellaDatiConnection connection = BellaDati.connect();
	
	private HttpSession session;
	
	@Property
	private DataSet dataset;
	
	@Property
	private int a;
	
	private String getDeploymentUrl(HttpServletRequest request) {
		String requestUrl = request.getRequestURL().toString();
		String servletPath = request.getServletPath();
		return requestUrl.substring(0, requestUrl.length() - servletPath.length());
	}
	
	public OAuthRequest initiateOAuth(String redirectUrl) {
		//OAuthRequest request = connection.oAuth("techKey", "techSecret", redirectUrl);
		OAuthRequest request = connection.oAuth("techKey", "techSecret");
		session.setAttribute(SESSION_OAUTH_ATTRIBUTE, request);
		return request;
	}
	
	public BellaDatiService getService() {
		return (BellaDatiService) session.getAttribute(SESSION_SERVICE_ATTRIBUTE);
	}
	
	@BeginRender
	void doBeginRender() {
		String datasetId="3231";
		a=10;
		initiateOAuth(null);
		//dataset=getService().loadDataSet(datasetId);
	}
}
