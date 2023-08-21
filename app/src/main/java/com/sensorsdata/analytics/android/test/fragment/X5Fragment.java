package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.FileController;
import com.sensorsdata.analytics.android.test.view.X5WebView;
import com.tencent.smtt.export.external.interfaces.ConsoleMessage;
import com.tencent.smtt.sdk.WebChromeClient;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/*
 *  X5WebView 加载 H5 页面
 * */
public class X5Fragment extends Fragment {

    private X5WebView webView;
    private boolean enableVerify,isOldVersion;
    private String fun,url;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceStateApp) {
        View view = inflater.inflate(R.layout.fragment_x5, container, false);
        webView=view.findViewById(R.id.x5_web);
        System.out.println("版本号"+webView.getX5WebViewExtension().getQQBrowserVersion());
        mWebViewSetting();
        initData();
        //如果使用新版打通,这里无需额外处理
        loadPage(webView,fun);
        //如果是旧版本打通,需手动调用
        if (isOldVersion){
            SensorsDataAPI.sharedInstance().showUpX5WebView(webView,enableVerify);
//            FileController.getFileControl().writeToLogFile("showUpX5WebView(webView,enableVerify)","webView,"+enableVerify,null);
        }
        return view;
    }

    //webview 设置
    private void mWebViewSetting(){
        webView.getSettings().setJavaScriptEnabled(true);
        //打印Console日志
        webView.setWebChromeClient(new WebChromeClient(){
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("SA.C",consoleMessage.message());
                return true;
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView webView, String url) {
                System.out.println("url:"+url);
                webView.loadUrl(url);
                return super.shouldOverrideUrlLoading(webView, url);
            }
        });
    }

    //参数设置
    private void initData() {
        isOldVersion=getActivity().getIntent().getBooleanExtra("isOldVersion",false);
        enableVerify=getActivity().getIntent().getBooleanExtra("enableVerify",false);
        fun=getActivity().getIntent().getStringExtra("function");
//        url="http://jssdk.debugbox.sensorsdata.cn/js/zjj/demo3/index.html";
//        url="file:///android_asset/divtest.html";
//        url="https://vz5w50.wx.npoll.net/act/detail?act=139128&id=2074014&RankByAct=1";
        url="file:///android_asset/test2.html";
        //url="https://liuweiqiang2016.github.io/page.io/";

    }

    private void loadPage(X5WebView webView,String fun){
        System.out.println("加载方式:"+fun);
        switch (fun){
            case "loadUrl":
                webView.loadUrl(url);
                break;
            case "loadUrl2":
                Map<String,String> map= new HashMap<>();
                webView.loadUrl(url,map);
                break;
            case "postUrl":
                byte[] bytes=new byte[]{};
                webView.postUrl(url,bytes);
                break;
            case "loadData":
                try {
                    String data=FileController.getFileControl().getHtmlData(getContext(),"test1.html");
                    webView.loadData(URLEncoder.encode(data,"utf-8"),"text/html; charset=UTF-8",null);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                break;
            case "loadDataWithBaseUrl":
                String data=FileController.getFileControl().getHtmlData(getContext(),"test1.html");
                webView.loadDataWithBaseURL(url,data,"text/html",null,"");
                break;
        }

    }

}
