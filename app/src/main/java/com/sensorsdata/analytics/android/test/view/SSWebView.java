package com.sensorsdata.analytics.android.test.view;

import android.content.Context;
import android.util.AttributeSet;

public class SSWebView extends CustomizeWebView{

    public SSWebView(Context context) {
        super(context);
    }

    public SSWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SSWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public SSWebView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public void loadPage(String url){
        loadUrl(url);
    }
}
