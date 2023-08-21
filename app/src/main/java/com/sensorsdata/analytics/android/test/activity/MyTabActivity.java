package com.sensorsdata.analytics.android.test.activity;

import android.app.TabActivity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.TabHost;
import android.widget.ToggleButton;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.adapter.CustomPagerAdapter;
import com.sensorsdata.analytics.android.test.utils.Common;

import java.util.ArrayList;
import java.util.List;

/*
* 用来验证TabHost的$AppClick事件
* */

//@SensorsDataIgnoreTrackAppViewScreenAndAppClick
public class MyTabActivity extends TabActivity{

    private ViewPager viewPager;
    private Button btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tabhost);
        setTitle("TabHost 页面");
        TabHost tabHost=getTabHost();
        TabHost.TabSpec p1=tabHost.newTabSpec("tab1").setIndicator("tab1").setContent(new Intent(this, H5Activity.class));
        tabHost.addTab(p1);
        TabHost.TabSpec p2=tabHost.newTabSpec("tab3").setIndicator("tab3").setContent(new Intent(this, AutoTrackActivity.class));
        tabHost.addTab(p2);
//        TabHost.TabSpec p2=tabHost.newTabSpec("tab2").setIndicator("tab2").setContent(new Intent(this, H5Activity.class));
//        tabHost.addTab(p2);
//        TabHost.TabSpec p1=tabHost.newTabSpec("tab1").setIndicator("tab1").setContent(R.id.host_1);
//        tabHost.addTab(p1);
//        TabHost.TabSpec p3=tabHost.newTabSpec("tab3").setIndicator("tab3").setContent(R.id.host_3);
//        tabHost.addTab(p3);
        viewPager=findViewById(R.id.tab_vp);
        btn=findViewById(R.id.host_btn);
        tabHost.setOnTabChangedListener(new TabHost.OnTabChangeListener() {
            @Override
            public void onTabChanged(String s) {

            }
        });
        Common.loge("本页面使用以下注解:@SensorsDataIgnoreTrackAppViewScreenAndAppClick");
        initViewPager();
        ToggleButton toggleButton=findViewById(R.id.host_tb);
        toggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                System.out.println("b===="+b);
                if (b){
                    btn.setVisibility(View.VISIBLE);
                }else {
                    btn.setVisibility(View.GONE);
                }
            }
        });
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

    }

    private void initViewPager(){
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            list.add("第" + i + "个View");
        }
        viewPager.setAdapter(new CustomPagerAdapter(this, list));
        viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int i, float v, int i1) {
            }

            @Override
            public void onPageSelected(int i) {

            }

            @Override
            public void onPageScrollStateChanged(int i) {

            }
        });

    }

}
