package com.sensorsdata.analytics.android.test.activity;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import com.sensorsdata.analytics.android.sdk.ScreenAutoTracker;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.AutoTrack;
import com.sensorsdata.analytics.android.test.utils.Common;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class AutoTrackActivity extends AppCompatActivity implements View.OnClickListener, ScreenAutoTracker {

    private AutoTrack autoTrack=new AutoTrack();

    private EditText sessionTime;
    private TextView showSessionTime;

    private FragmentManager mFragmentManager;
    private Fragment fragmentNow,fragment;
    private FragmentTransaction fragmentTransaction;
    private Spinner mSpinner;

    private String[] spinnerItems={"HomeActivity","TimerOutDateActivity","AutoTrackActivity","ViewActivity"};
    private Class[] spinnerReal={HomeActivity.class,AutoTrackActivity.class,ViewActivity.class};
    private TextView textView_viewScreen;
    private TextView textView_appclick;
    private TextView textView_activities;
    public ArrayList activities=new ArrayList();
    private TextView textView_RN;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auto_track);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setDisplayShowHomeEnabled(true);
            actionBar.setTitle("AutoTrack 页面");
        }
        sessionTime=findViewById(R.id.et_sessionTime);
        showSessionTime=findViewById(R.id.tv_getSessionTime);
        findViewById(R.id.btn_setSessionTime).setOnClickListener(this);
        findViewById(R.id.btn_getSessionTime).setOnClickListener(this);
        findViewById(R.id.btn_ignore).setOnClickListener(this);
        findViewById(R.id.btn_resume).setOnClickListener(this);
        findViewById(R.id.btn_isAuto_viewScreen).setOnClickListener(this);
        findViewById(R.id.btn_isAuto_appClick).setOnClickListener(this);
        findViewById(R.id.btn_add).setOnClickListener(this);
        findViewById(R.id.btn_delete).setOnClickListener(this);
        findViewById(R.id.btn_ignoreList).setOnClickListener(this);
        findViewById(R.id.btn_resumeList).setOnClickListener(this);
        findViewById(R.id.btn_enableRN).setOnClickListener(this);
        findViewById(R.id.btn_is_RNenable).setOnClickListener(this);

        textView_viewScreen=findViewById(R.id.tv_isAuto_viewScreen);
        textView_appclick=findViewById(R.id.tv_isAuto_appClick);
        textView_activities=findViewById(R.id.tv_showlist);
        textView_RN=findViewById(R.id.tv_showRN);
//        textView_activities.setText(activities.toString());

        initSpinner();

    }


    //初始化spinner
    private void initSpinner(){
        mSpinner=(Spinner) findViewById(R.id.spinner_activity);
        ArrayAdapter spinnerAdapter=new ArrayAdapter<>(this, R.layout.item_select_auto,spinnerItems);
        spinnerAdapter.setDropDownViewResource(R.layout.item_select);
        mSpinner.setAdapter(spinnerAdapter);
        //点击响应事件
//        mSpinner.setOnItemSelectedListener(this);
    }

    //获取activity集合
    public List getActivities(){
        List<Class> nowAactivites = new ArrayList<>();
        for (int i = 0; i<spinnerItems.length; i++){
            if (activities.contains(spinnerItems[i])){
                nowAactivites.add(spinnerReal[i]);
            }

        }

        return nowAactivites;
    }


    @Override
    public void onClick(View v) {
        int newSessionTime=0;
        try{
            newSessionTime=Integer.parseInt(sessionTime.getText().toString());
        }catch (Exception e){
            e.printStackTrace();
        }

        int pos = mSpinner.getSelectedItemPosition();

        switch (v.getId()){
            case R.id.btn_setSessionTime:
                autoTrack.setSessionTime(newSessionTime);
                Common.toast(this,"时间设置成功");
                break;

            case R.id.btn_getSessionTime:
                int getSession = autoTrack.getSessionTime();
                showSessionTime.setText(String.valueOf(getSession));
                break;

            case R.id.btn_ignore:
                Common.toast(this,"忽略该activity："+spinnerItems[pos].toString());
                autoTrack.ignoreActivity(spinnerReal[pos]);
                break;

            case R.id.btn_resume:
                Common.toast(this,"恢复该activity："+spinnerItems[pos].toString());
                autoTrack.resumeActivity(spinnerReal[pos]);
                break;

            case R.id.btn_isAuto_viewScreen:
                Object getReturn = autoTrack.isActivityIgnore_appViewScreen(spinnerReal[pos]);
                textView_viewScreen.setText(getReturn.toString());
                break;

            case R.id.btn_isAuto_appClick:
                Object getReturn2 = autoTrack.isActivityIgnore_appClick(spinnerReal[pos]);
                textView_appclick.setText(getReturn2.toString());
                break;

            case R.id.btn_add:
                if (!activities.contains(spinnerItems[pos])){
                    activities.add(spinnerItems[pos]);
                }
                textView_activities.setText(activities.toString());
                break;

            case R.id.btn_delete:
                if (activities.contains(spinnerItems[pos])){
                    activities.remove(spinnerItems[pos]);
                }

                textView_activities.setText(activities.toString());
                break;

            case R.id.btn_ignoreList:
                autoTrack.ignoreActivity(getActivities());
                Common.toast(this,"已忽略选中的activitis列表");
                break;

            case R.id.btn_resumeList:
                autoTrack.resumeActivities(getActivities());
                Common.toast(this,"已恢复选中的activitis列表");
                break;

            case R.id.btn_enableRN:
                autoTrack.enableRN();
                Common.toast(this,"已开启RN采集");
                break;

            case R.id.btn_is_RNenable:
                Object isRN = autoTrack.isRNautoTrack();
                textView_RN.setText(isRN.toString());
                break;

            default:
                break;

        }

    }

    @Override
    protected void onResume() {
        super.onResume();
//        Common.toast(this,"又进入该页面");

    }


    //自定义appViewScreen属性
    @Override
    public String getScreenUrl() {

        return "AutoTrackActivity";
    }

    @Override
    public JSONObject getTrackProperties() throws JSONException {
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("number01",7777);
        jsonObject.put("number02","自定义属性2");
//        jsonObject.put("$screen_name","name_autoTrack");
//        jsonObject.put("$title","title_name_autoTrack");

        return jsonObject;
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
