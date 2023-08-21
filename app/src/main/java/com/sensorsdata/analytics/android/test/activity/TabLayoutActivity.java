package com.sensorsdata.analytics.android.test.activity;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.design.widget.TabLayout;
import android.view.MenuItem;

import com.sensorsdata.analytics.android.sdk.ScreenAutoTracker;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;

import org.json.JSONException;
import org.json.JSONObject;

public class TabLayoutActivity extends AppCompatActivity implements ScreenAutoTracker {

    private TabLayout mytab;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tablayout);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setDisplayShowHomeEnabled(true);
            actionBar.setTitle("TabLayout 页面");
        }
        mytab=findViewById(R.id.tabLayout);
        TabLayout.Tab tab=mytab.newTab();
        tab.setText("选项卡一").setIcon(R.mipmap.ic_launcher);
//        SensorsDataAPI.sharedInstance().setViewProperties(mytab,properties);
//        mytab.addTab(mytab.newTab().setText("选项卡一").setIcon(R.mipmap.ic_launcher));
        mytab.addTab(tab);
        mytab.addTab(mytab.newTab().setText("选项卡二").setIcon(R.mipmap.ic_launcher));
        mytab.addTab(mytab.newTab().setText("选项卡三").setIcon(R.mipmap.ic_launcher));
        mytab.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

    }

    @Override
    public String getScreenUrl() {
        return null;
    }

    @Override
    public JSONObject getTrackProperties() throws JSONException {
        JSONObject object =new JSONObject();
        object.put("$screen_name","test111");
        return null;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            //actionbar navigation up 按钮
            case android.R.id.home:
                onBackPressed();
                break;
            default:
                break;
        }
        return true;
    }
}
