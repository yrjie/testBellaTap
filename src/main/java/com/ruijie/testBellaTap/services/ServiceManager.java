package com.ruijie.testBellaTap.services;

import org.apache.tapestry5.services.Session;

import com.belladati.sdk.BellaDatiService;

public class ServiceManager {
	private static final String SESSION_SERVICE_ATTRIBUTE = "BellaDatiService";
	private static final String SESSION_OAUTH_ATTRIBUTE = "pendingOAuth";
	
	public static BellaDatiService getService(Session session) {
		return (BellaDatiService) session.getAttribute(SESSION_SERVICE_ATTRIBUTE);
	}
	
	public static boolean getLoggedIn(Session session){
		return session.getAttribute(SESSION_SERVICE_ATTRIBUTE)!=null;
	}
}
