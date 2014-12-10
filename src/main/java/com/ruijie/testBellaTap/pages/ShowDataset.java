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

import com.belladati.sdk.dataset.Attribute;
import com.belladati.sdk.dataset.DataSet;
import com.belladati.sdk.dataset.Indicator;
import com.belladati.sdk.report.ReportInfo;
import com.ruijie.testBellaTap.services.ServiceManager;

public class ShowDataset {
	
	private static final String SESSION_SERVICE_ATTRIBUTE = "BellaDatiService";
	private static final String SESSION_OAUTH_ATTRIBUTE = "pendingOAuth";
	
	@Inject
	Request request;
	
	@Property
	@Persist
	String id;
	
	@Persist
	private Session session;
	
	@Property
	@Persist
	private DataSet dataset;
	
	@Property
	private Indicator _indicator;
	
	@Property
	private Attribute _attr;
	
	@Property
	private ReportInfo _report;
	
	public boolean getLoggedIn(){
		return session.getAttribute(SESSION_SERVICE_ATTRIBUTE)!=null;
	}
	
	@BeginRender
	void doBeginRender() {
		id=request.getParameter("id");
		session=request.getSession(true);
		if (getLoggedIn()){
			dataset=ServiceManager.getService(session).loadDataSet(id);
		}
	}
}
