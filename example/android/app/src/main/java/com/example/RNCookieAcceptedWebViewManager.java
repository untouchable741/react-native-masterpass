package com.example;

import android.os.Build;
import android.webkit.CookieManager;
import android.webkit.WebView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.webview.ReactWebViewManager;

public class RNCookieAcceptedWebViewManager extends ReactWebViewManager {
	private String REACT_CLASS = "RCTWebView";

	@Override
	public String getName() {
		return REACT_CLASS;
	}

	@Override
	protected WebView createViewInstance(ThemedReactContext reactContext) {
		WebView view = super.createViewInstance(reactContext);

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
			CookieManager.getInstance().setAcceptThirdPartyCookies(view, true);
		}

		return view;
	}
}