package com.sensorsdata.analytics.android.test.fragment;


import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Switch;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;

import org.json.JSONException;
import org.json.JSONObject;

public class TimerFragment extends Fragment implements View.OnClickListener{
    public EditText eventName;
    public Button start,end,endWithProperties,pause,resume,sleep2s,sleepAndEnd,clear,beginJump,trackTimerJump;
    private String TAG="EventTimerTester";
    private String mEventName;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.home_tab2, container, false);
        eventName=view.findViewById(R.id.eventName);
        view.findViewById(R.id.start).setOnClickListener(this);
        view.findViewById(R.id.end).setOnClickListener(this);
        view.findViewById(R.id.endWithProperties).setOnClickListener(this);
        view.findViewById(R.id.pause).setOnClickListener(this);
        view.findViewById(R.id.remove).setOnClickListener(this);
        view.findViewById(R.id.resume).setOnClickListener(this);
        view.findViewById(R.id.sleep2s).setOnClickListener(this);
        view.findViewById(R.id.sleepAndEnd).setOnClickListener(this);
        view.findViewById(R.id.clear).setOnClickListener(this);
        view.findViewById(R.id.beginJump).setOnClickListener(this);
        view.findViewById(R.id.time_new).setOnClickListener(this);
        mEventName=eventName.getText().toString();
        return view;
    }


    @Override
    public void onClick(View v) {

        switch(v.getId()){
            case R.id.start:
                //开始接口，事件名称统一传editText文本内容，其他接口区分新旧方式
                Common.toast(this.getContext(),"计时器初始化");
                mEventName=eventName.getText().toString();
                Log.e(TAG, "mEventName: "+mEventName );
                SensorsDataAPI.sharedInstance().trackTimerStart(mEventName);
                break;

            case R.id.end:
                Common.toast(this.getContext(),"结束按钮");
                Log.e(TAG, "mEventName: "+mEventName );
                SensorsDataAPI.sharedInstance().trackTimerEnd(mEventName);
                break;

            case R.id.sleep2s:
                Common.toast(this.getContext(),"设置2秒休眠");
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.sleepAndEnd:
                //开始后等两秒结束
                Common.toast(this.getContext(),"开始后等两秒结束");
                SensorsDataAPI.sharedInstance().trackTimerStart("test2S");
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                SensorsDataAPI.sharedInstance().trackTimerEnd("test2S");
                break;

            case R.id.endWithProperties:
                //带自定义属性结束
                Common.toast(this.getContext(),"带属性结束按钮");
                try {
                    JSONObject jsonObject=new JSONObject();
                    jsonObject.put("city","hefei");
                    SensorsDataAPI.sharedInstance().trackTimerEnd(mEventName,jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.beginJump:
                //跳转
                break;

            case R.id.resume:
                Common.toast(this.getContext(),"恢复");
                SensorsDataAPI.sharedInstance().trackTimerResume(mEventName);
                break;

            case R.id.pause:
                Common.toast(this.getContext(),"暂停");
                SensorsDataAPI.sharedInstance().trackTimerPause(mEventName);
                break;

            case R.id.clear:
                Common.toast(this.getContext(),"清除所有计时器");
                SensorsDataAPI.sharedInstance().clearTrackTimer();
                break;

            case R.id.remove:
                Common.toast(this.getContext(),"删除当前计时器");
                SensorsDataAPI.sharedInstance().removeTimer(mEventName);
                break;

            case R.id.time_new:
                //计时器新方式测试
                testNewWay();
                break;
            default:
                break;
        }
    }

    private void testNewWay(){
//        try {
//            String eventName="newWay";
//            //用例1,开始触发4个同名事件,预期结果：事件正常开启
//            SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName1=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName2=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName3=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName4=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName5=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName6=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName7=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName8=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//            String eventName9=SensorsDataAPI.sharedInstance().trackTimerStart(eventName);
//
//            //Log.e("计时器新方式", "事件名:"+eventName1+","+eventName2+","+eventName3+","+eventName4+","+eventName5+","+eventName6+","+eventName7+","+eventName8);
//            Thread.sleep(2000);
//            //用例2，结束事件,预期结果：旧方式事件结束，触发事件名为：newWay，时长2s（可能存在轻微波动,以下类似），其他事件均继续计时
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName);
//            Thread.sleep(500);
//            //用例3,停止第一个事件,预期结果：第一个事件结束，触发事件，事件名为：newWay，时长2.5s
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName1);
//            Thread.sleep(100);
//            //用例4,暂停第2,3个事件,200ms后,然后恢复第3个事件。100ms后，结束第2，3个事件。预期结果：分别触发事件，事件名均为：newWay，时长分别为2.6s和2.7s
//            SensorsDataAPI.sharedInstance().trackTimerPause(eventName2);
//            SensorsDataAPI.sharedInstance().trackTimerPause(eventName3);
//            Thread.sleep(200);
//            SensorsDataAPI.sharedInstance().trackTimerResume(eventName3);
//            Thread.sleep(100);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName2);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName3);
//            //用例5,恢复第4,5个事件,100ms后，暂停第4个事件。200ms后，结束第4、5个事件。预期结果：分别触发事件，事件名均为：newWay，时长分别为3s和3.2s
//            SensorsDataAPI.sharedInstance().trackTimerResume(eventName4);
//            SensorsDataAPI.sharedInstance().trackTimerResume(eventName5);
//            Thread.sleep(100);
//            SensorsDataAPI.sharedInstance().trackTimerPause(eventName4);
//            Thread.sleep(200);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName4);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName5);
//            //用例6,remove事件6,200ms后end该事件。预期结果：触发事件，事件名称为：newWay,不包含时长属性
//            Thread.sleep(100);
//            SensorsDataAPI.sharedInstance().removeTimer(eventName6);
//            Thread.sleep(200);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName6);
//            //用例7,在子线程中停止事件。预期结果：触发事件，事件名为：newWay，时长3.5s
//
//            new Thread(){
//                @Override
//                public void run() {
//                    super.run();
//                    SensorsDataAPI.sharedInstance().trackTimerEnd(eventName7);
//
//                }
//            }.start();
//            //用例8，clear所有事件，然后end该事件。预期结果：触发3个事件，事件名称为：newWay,均不包含时长属性
//            Thread.sleep(100);
//            SensorsDataAPI.sharedInstance().clearTrackTimer();
//            Thread.sleep(100);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName8);
//            SensorsDataAPI.sharedInstance().trackTimerEnd(eventName9);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
    }


}
