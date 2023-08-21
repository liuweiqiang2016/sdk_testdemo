package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.view.CustomizeWebView;
import com.sensorsdata.analytics.android.test.view.CustomizeX5WebView;

/*
 * 多个 WebView 加载 H5 页面
 * */
public class MoreWebFragment extends Fragment {

    //用来验证自定义WebView的h5打通
    private CustomizeWebView wv1;
    //用来验证自定义X5WebView的h5打通
    private CustomizeX5WebView wv2;
    private String url1,url2;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceStateApp) {
        View view = inflater.inflate(R.layout.fragment_more_web, container, false);
        wv1=view.findViewById(R.id.h5_web1);
        wv2=view.findViewById(R.id.h5_web2);
        mWebViewSetting(wv1);
        mX5WebViewSetting(wv2);
        initData();
        loadPage();
        return view;
    }

    //webview 设置
    private void mWebViewSetting(WebView webView){
        webView.getSettings();
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        //打印Console日志
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("ConsoleMessage",consoleMessage.message());
                return true;
            }
        });
//        webSettings.setAllowFileAccess(true);// 设置允许访问文件数据
//        webSettings.setSupportZoom(true);
//        webSettings.setBuiltInZoomControls(true);
//        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
//        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
//        webSettings.setDatabaseEnabled(true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return super.shouldOverrideUrlLoading(view, url);
            }
        });
        //修复中文乱码
        webSettings.setDefaultTextEncodingName("UTF-8");
    }

    //webview 设置
    private void mX5WebViewSetting(CustomizeX5WebView webView){
        com.tencent.smtt.sdk.WebSettings webSettings=webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        //打印Console日志
        webView.setWebChromeClient(new com.tencent.smtt.sdk.WebChromeClient(){
            @Override
            public boolean onConsoleMessage(com.tencent.smtt.export.external.interfaces.ConsoleMessage consoleMessage) {
                Log.d("ConsoleMessage",consoleMessage.message());
                return true;
            }
        });
//        webSettings.setAllowFileAccess(true);// 设置允许访问文件数据
//        webSettings.setSupportZoom(true);
//        webSettings.setBuiltInZoomControls(true);
//        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
//        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
//        webSettings.setDatabaseEnabled(true);

        webView.setWebViewClient(new com.tencent.smtt.sdk.WebViewClient(){

            @Override
            public boolean shouldOverrideUrlLoading(com.tencent.smtt.sdk.WebView webView, String url) {
                webView.loadUrl(url);
                return super.shouldOverrideUrlLoading(webView, url);
            }
        });
        //修复中文乱码
        webSettings.setDefaultTextEncodingName("UTF-8");
    }

    //参数设置
    private void initData() {
//        url1="https://liuweiqiang2019.gitee.io/pages";
        url1="file:///android_asset/test.html";
        url2="https://combat88.github.io/sensors_test/autoTrack4.html";
//        url2="https://combat88.github.io/sensors_test/autoTrack4.html";

    }

    private void loadPage(){
        wv1.loadUrl(url1);
        wv2.loadUrl(url2);
    }
}
