package com.sensorsdata.analytics.android.test.fragment;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.widget.LinearLayout;

import com.just.agentweb.AgentWeb;
import com.just.agentweb.DefaultWebClient;
import com.just.agentweb.WebChromeClient;
import com.just.agentweb.WebViewClient;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.HashMap;
import java.util.Map;

/*
 * 第三方开源 Agent WebView 加载 H5 页面
 * */
public class AgentFragment extends Fragment {


    protected AgentWeb mAgentWeb;
    private LinearLayout mLinearLayout;
    private boolean isSupportJellyBean,enableVerify,isOldVersion;
    private WebView webView=null;
    private String fun;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceStateApp) {
        View view = inflater.inflate(R.layout.fragment_agent, container, false);
        mLinearLayout = (LinearLayout) view.findViewById(R.id.container);
        initData();
//        long p = System.currentTimeMillis();
//        //如果使用新版打通,这里无需额外处理
//        mWebViewSetting();
//        long n = System.currentTimeMillis();
//        Log.i("Info", "init used time:" + (n - p));
        loadPage(webView,fun);
        //如果是旧版本打通,需手动调用
        if (isOldVersion&&!fun.equals("loadUrl")){
            SensorsDataAPI.sharedInstance().showUpWebView(webView,isSupportJellyBean,enableVerify);
//            FileController.getFileControl().writeToLogFile("showUpWebView(webView,isSupportJellyBean,enableVerify)","webView,"+","+isSupportJellyBean+","+enableVerify,null);
        }
        return view;
    }

    //webview 设置
    private void mWebViewSetting(){
        mAgentWeb = AgentWeb.with(this)
                .setAgentWebParent(mLinearLayout, new LinearLayout.LayoutParams(-1, -1))
                .useDefaultIndicator()
                .setWebChromeClient(mWebChromeClient)
                .setWebViewClient(mWebViewClient)
                .setMainFrameErrorView(R.layout.agentweb_error_page, -1)
                .setSecurityType(AgentWeb.SecurityType.STRICT_CHECK)
                //.setWebLayout(new WebLayout(this))
                .setOpenOtherPageWays(DefaultWebClient.OpenOtherPageWays.ASK)//打开其他应用时，弹窗咨询用户是否前往其他应用
                .interceptUnkownUrl() //拦截找不到相关页面的Scheme
                .createAgentWeb()
                .ready()
                .go("");
        //获取 webView
        webView=mAgentWeb.getWebCreator().getWebView();
    }

    //参数设置
    private void initData() {
        isOldVersion=getActivity().getIntent().getBooleanExtra("isOldVersion",false);
        isSupportJellyBean=getActivity().getIntent().getBooleanExtra("isSupportJellyBean",false);
        enableVerify=getActivity().getIntent().getBooleanExtra("enableVerify",false);
        fun=getActivity().getIntent().getStringExtra("function");
        //如果调用方法不是使用loadUrl,需要获取webView对象；如果是如果调用方法是使用loadUrl,直接使用go方法加载，而不用获取webView对象
        if (!fun.equals("loadUrl")){
            mWebViewSetting();
        }
    }

    private com.just.agentweb.WebViewClient mWebViewClient = new WebViewClient() {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return super.shouldOverrideUrlLoading(view, request);
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            //do you  work
            Log.i("Info", "BaseWebActivity onPageStarted");
        }
    };

    //打印Console日志
    private com.just.agentweb.WebChromeClient mWebChromeClient = new WebChromeClient() {
        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Log.d("ConsoleMessage",consoleMessage.message());
            return true;
        }
    };

    //设置url
    public String getUrl() {
        return "file:///android_asset/test.html";
    }

    private void loadPage(WebView webView,String fun){
        System.out.println("加载方式:"+fun);
        switch (fun){
            case "loadUrl":
                mAgentWeb = AgentWeb.with(this)
                        .setAgentWebParent(mLinearLayout, new LinearLayout.LayoutParams(-1, -1))
                        .useDefaultIndicator()
                        .setWebChromeClient(mWebChromeClient)
                        .setWebViewClient(mWebViewClient)
                        .setMainFrameErrorView(R.layout.agentweb_error_page, -1)
                        .setSecurityType(AgentWeb.SecurityType.STRICT_CHECK)
                        //.setWebLayout(new WebLayout(this))
                        .setOpenOtherPageWays(DefaultWebClient.OpenOtherPageWays.ASK)//打开其他应用时，弹窗咨询用户是否前往其他应用
                        .interceptUnkownUrl() //拦截找不到相关页面的Scheme
                        .createAgentWeb()
                        .ready()
                        .go(getUrl());
                if (isOldVersion){
                    SensorsDataAPI.sharedInstance().showUpWebView(mAgentWeb.getWebCreator().getWebView(),isSupportJellyBean,enableVerify);
//                    FileController.getFileControl().writeToLogFile("showUpWebView(webView,isSupportJellyBean,enableVerify)","webView,"+","+isSupportJellyBean+","+enableVerify,null);
                }
                break;
            case "loadUrl2":
                Map<String,String> map= new HashMap<>();
                webView.loadUrl(getUrl(),map);
                break;
            case "postUrl":
                byte[] bytes=new byte[]{};
                webView.postUrl(getUrl(),bytes);
                break;
            case "loadData":
//                try {
//                    String data="";
//                    webView.loadData(URLEncoder.encode(data,"utf-8"),"text/html; charset=UTF-8",null);
//                } catch (UnsupportedEncodingException e) {
//                    e.printStackTrace();
//                }
                break;
            case "loadDataWithBaseUrl":
                String data=FileController.getFileControl().getHtmlData(getContext(),"index.html");
                webView.loadDataWithBaseURL(getUrl(),data,"text/html",null,"");
                break;
        }

    }

}
