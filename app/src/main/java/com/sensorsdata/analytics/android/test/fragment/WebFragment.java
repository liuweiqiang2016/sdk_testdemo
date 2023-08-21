package com.sensorsdata.analytics.android.test.fragment;

import android.os.Build;
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

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;
import com.sensorsdata.analytics.android.test.view.CustomizeWebView;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/*
 * 原生 WebView 加载 H5 页面
 * */
public class WebFragment extends Fragment {

//    private WebView webView;
    private CustomizeWebView webView;
    private boolean isSupportJellyBean,enableVerify,isOldVersion;
    private String fun,url;

    String TAG="SA.S";
    private long start_time=0,end_time=0;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceStateApp) {
        View view = inflater.inflate(R.layout.fragment_web, container, false);
        view.findViewById(R.id.h5_btn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        //允许WebView使用inspect调试
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        webView=view.findViewById(R.id.h5_web);
        mWebViewSetting();
        initData();
        start_time=System.currentTimeMillis();
        Log.e(TAG, "加载前时间戳:"+start_time);
        //如果使用新版打通,这里无需额外处理
        loadPage(webView,fun);
        //如果是旧版本打通,需手动调用
        if (isOldVersion){
            SensorsDataAPI.sharedInstance().showUpWebView(webView,isSupportJellyBean,enableVerify);
//            FileController.getFileControl().writeToLogFile("showUpWebView(webView,isSupportJellyBean,enableVerify)","webView,"+","+isSupportJellyBean+","+enableVerify,null);
        }
        return view;
    }

    //webview 设置
    private void mWebViewSetting(){
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
//                String msg=consoleMessage.message();
//                try {
//                    JSONObject jsonObject=JSONObject.parseObject(msg);
//                    String type=jsonObject.getString("type");
//                    String event=jsonObject.getString("event");
//                    if (event==null&&type!=null){
//                        FileController.getFileControl().writeToLogFile(type,"","");
//                    }
//                    if (event!=null&&type!=null){
//                        FileController.getFileControl().writeToLogFile(type,event,"");
//                    }
//                }catch (Exception e){
//                    //如果走到这里，说明不是json串，直接打印
//                    FileController.getFileControl().writeToLogFile(msg,"","");
//                }
                return true;
            }

//            @Override
//            public void onProgressChanged(WebView view, int newProgress) {
//                super.onProgressChanged(view, newProgress);
//                if (newProgress==100){
//                    end_time=System.currentTimeMillis();
//                    Log.e(TAG, "加载进度100%时间戳:"+end_time);
//                    Log.e(TAG, "加载耗时:"+(end_time-start_time)+"ms");
//                }
//
//            }
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
                System.out.println("url:"+url);
                view.loadUrl(url);
                return super.shouldOverrideUrlLoading(view, url);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                end_time=System.currentTimeMillis();
                Log.e(TAG, "加载完成时间戳:"+end_time);
                Log.e(TAG, "加载耗时:"+(end_time-start_time)+"ms");

            }

        });
        //修复中文乱码
        webSettings.setDefaultTextEncodingName("UTF-8");

//        //设置true,才能让Webivew支持<meta>标签的viewport属性
//        webSettings.setUseWideViewPort(true);
//        //设置可以支持缩放
//        webSettings.setSupportZoom(true);
//        //设置出现缩放工具
//        webSettings.setBuiltInZoomControls(true);

    }

    //参数设置
    private void initData() {
        isOldVersion=getActivity().getIntent().getBooleanExtra("isOldVersion",false);
        isSupportJellyBean=getActivity().getIntent().getBooleanExtra("isSupportJellyBean",false);
        enableVerify=getActivity().getIntent().getBooleanExtra("enableVerify",false);
        fun=getActivity().getIntent().getStringExtra("function");
//        url= "http://jssdk.debugbox.sensorsdata.cn/js/gc/sdk-ng/index.html";
        url="file:///android_asset/test3.html";
//        url="http://jssdk.debugbox.sensorsdata.cn/js/zjj/abtest/index.html";
//        url="https://liuweiqiang2016.github.io/page.io/";
    }

    private void loadPage(CustomizeWebView webView,String fun){
        System.out.println("加载方式:"+fun);
        switch (fun){
            case "loadUrl":
                webView.tt(url);
                //System.out.println("url:"+url);
//                webView.loadUrl(url);
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
                    String data=FileController.getFileControl().getHtmlData(getContext(),"test3.html");
                    webView.loadData(URLEncoder.encode(data,"utf-8"),"text/html; charset=UTF-8",null);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                break;
            case "loadDataWithBaseUrl":
                String data=FileController.getFileControl().getHtmlData(getContext(), "test3.html");
//                System.out.println(data);
                webView.loadDataWithBaseURL(url,data,"text/html",null,"");
                break;
        }

    }

    public boolean isIndexPage(){
        String currentURL=webView.getUrl();
        if (webView!=null&&currentURL!=null){
            if (currentURL.equals("about:blank")||currentURL.equals(url)||currentURL.equals(url+"/")){
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }
    }

    public void goBack(){
        if (webView!=null){
            webView.goBack();
        }
    }

}
