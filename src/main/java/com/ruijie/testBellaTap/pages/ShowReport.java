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

import com.belladati.sdk.dashboard.Dashlet;
import com.belladati.sdk.dataset.AttributeValue;
import com.belladati.sdk.report.Report;
import com.belladati.sdk.view.JsonView;
import com.belladati.sdk.view.View;
import com.ruijie.testBellaTap.services.ServiceManager;

public class ShowReport {
	
	private static final String SESSION_SERVICE_ATTRIBUTE = "BellaDatiService";
	private static final String SESSION_OAUTH_ATTRIBUTE = "pendingOAuth";
	
	/** Hardcoded ID of the data set */
	private static final String DATA_SET_ID = "18812";

	/** Hardcoded ID of the attribute used to filter */
	private static final String ATTRIBUTE_CODE = "L_PRODUCT";
	
	@Inject
	Request request;
	
	@Property
	@Persist
	String id;
	
	@Persist
	private Session session;
	
	@Property
	@Persist
	Report report;
	
	@Property
	@Persist
	List<AttributeValue> attrValues;
	
	@Property
	AttributeValue _value;
	
	@Property
	@Persist
	List<JsonView> views;
	
	@Property
	JsonView _view;
	
	public boolean getLoggedIn(){
		return session.getAttribute(SESSION_SERVICE_ATTRIBUTE)!=null;
	}
	
	@BeginRender
	void doBeginRender() {
		id=request.getParameter("id");
		session=request.getSession(true);
		if (getLoggedIn()){
			report=ServiceManager.getService(session).loadReport(id);
			attrValues = ServiceManager.getService(session).getAttributeValues(DATA_SET_ID, ATTRIBUTE_CODE).loadFirstTime()
					.toList();
			views=new ArrayList<JsonView>();
			for (View i : report.getViews()){
				if (i.getType().toString()=="CHART")
					views.add((JsonView)i);
			}
		}
	}
}
