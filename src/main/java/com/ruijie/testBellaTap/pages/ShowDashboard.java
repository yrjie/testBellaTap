package com.ruijie.testBellaTap.pages;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
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
import com.belladati.sdk.view.JsonView;
import com.belladati.sdk.view.View;

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
	JsonView _content;
	
	@Persist
	private Session session;
	
	@Property
	@Persist
	List<JsonView> dashletConts;
	
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
			dashletConts=new ArrayList<JsonView>();
			for (Dashlet i : dashboard.getDashlets()){
				if (i.getType().toString()=="VIEW"&&((View)i.getContent()).getType().toString()=="CHART")
					dashletConts.add((JsonView)i.getContent());
			}
		}
	}
}
