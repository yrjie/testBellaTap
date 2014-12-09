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

import com.belladati.sdk.BellaDatiService;
import com.belladati.sdk.dashboard.Dashboard;
import com.belladati.sdk.dashboard.Dashlet;

public class ShowDashboard {
	
	private static final String SESSION_SERVICE_ATTRIBUTE = "BellaDatiService";
	private static final String SESSION_OAUTH_ATTRIBUTE = "pendingOAuth";
	
	@Inject
	Request request;
	
	@Property
	@Persist
	String id;
	
	@Property
	@Persist
	Dashboard dashboard;
	
	@Property
	Dashlet _dashlet;
	
	@Property
	@Persist
	String s1;
	
	@Persist
	private Session session;
	
	public boolean getLoggedIn(){
		return session.getAttribute(SESSION_SERVICE_ATTRIBUTE)!=null;
	}
	
	public BellaDatiService getService() {
		return (BellaDatiService) session.getAttribute(SESSION_SERVICE_ATTRIBUTE);
	}
	
	@BeginRender
	void doBeginRender() {
		id=request.getParameter("id");
		session=request.getSession(true);
		if (getLoggedIn()){
			dashboard=getService().loadDashboard(id);
			s1=dashboard.getDashlets().get(0).getContent().getClass().getName();
		}
	}
}
