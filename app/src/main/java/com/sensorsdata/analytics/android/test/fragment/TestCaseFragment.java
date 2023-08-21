package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataDynamicSuperProperties;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.adapter.LogAdapter;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;

public class TestCaseFragment extends Fragment implements View.OnClickListener {

    private ListView listView;
    private List<String> list;
    private List<String> temp;
    private StringBuffer stringBuffer;
    private LogAdapter adapter;
    private ArrayList<String> logList;
    private MyHandler handler;
    private Button button;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_test, container, false);
        listView=view.findViewById(R.id.lv);
        list=new ArrayList<String>();
        stringBuffer=new StringBuffer();
        list=new ArrayList<>();
        handler=new MyHandler(this);
        initView();
        //handler.sendEmptyMessage(1);
        button=view.findViewById(R.id.test_btn);
        button.setOnClickListener(this);
        return view;
    }

    private void initView(){
        adapter=new LogAdapter(this.getContext(),list);
        listView.setAdapter(adapter);
    }

    //将日志运行信息写入到list内存中
    /*
    * caseName:用例名称
    * param:传入参数
    * response：返回值
    * */
    private  void  writeToList(String caseName,String param,String response){
        String time= Common.getTime();
        if (param==null){
            param="无参数";
        }
        if (response==null){
            response="无返回";
        }
        list.add(time+"\n" + ""+"\n" +caseName+"\n" +""+"\n" +param+"\n" +""+"\n" +response);
        //更新listView
        adapter.notifyDataSetChanged();
    }

    //根据用例编号,执行用例
    private void runCase(int code){
        try{
            JSONObject jsonObject=new JSONObject();
            switch (code){
                case 1:
                    break;
                case 2:
                    //case02:获取预置属性
                    writeToList("case02:获取预置属性",null,SensorsDataAPI.sharedInstance().getPresetProperties().toString());
                    break;
                case 3:
                    //case03:track无属性事件
                    SensorsDataAPI.sharedInstance().track("Hello");
                    writeToList("case03:track无属性事件","Hello",null);
                    break;
                case 4:
                    //case04:track有属性事件
                    jsonObject.put("car","BMW");
                    SensorsDataAPI.sharedInstance().track("World",jsonObject);
                    writeToList("case04:track有属性事件","World,"+jsonObject.toString(),null);
                    break;
                case 5:
                    //case05:设置公共属性
                    //首先置空jsonObject
                    jsonObject.remove("car");
                    jsonObject.put("Super","java");
                    SensorsDataAPI.sharedInstance().registerSuperProperties(jsonObject);
                    SensorsDataAPI.sharedInstance().track("testSuper");
                    writeToList("case05:设置公共属性",jsonObject.toString(),null);
                    break;
                case 6:
                    //case06:设置动态公共属性
                    SensorsDataDynamicSuperProperties dynamicSuperProperties=new SensorsDataDynamicSuperProperties() {
                        @Override
                        public JSONObject getDynamicSuperProperties() {
                            try {
                                return new JSONObject().put("dynamic",System.currentTimeMillis());
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            return null;
                        }
                    };
                    SensorsDataAPI.sharedInstance().registerDynamicSuperProperties(dynamicSuperProperties);
                    SensorsDataAPI.sharedInstance().track("testDynamic");
                    writeToList("case06:设置动态公共属性","currentTimeMillis",null);
                    break;
                case 7:
                    //case07:计时器
                    SensorsDataAPI.sharedInstance().trackTimerStart("testTimer");
                    long value=500;
                    Thread.sleep(value);
                    SensorsDataAPI.sharedInstance().trackTimerEnd("testTimer");
                    writeToList("case07:计时器",value+"ms",null);
                    break;
                case 8:
                    //case08:获取匿名id
                    writeToList("case08:获取匿名id",null,SensorsDataAPI.sharedInstance().getAnonymousId());
                    break;
                case 9:
                    //case09:获取DistinctID
                    writeToList("case09:获取DistinctID",null,SensorsDataAPI.sharedInstance().getDistinctId());
                    break;
                case 10:
                    //case10:执行登陆,id为liu
                    jsonObject.remove("super");
                    jsonObject.put("mobile","huawei");
                    SensorsDataAPI.sharedInstance().login("lwq088",jsonObject);
                    writeToList("case10:执行登陆,id为liu","lwq088,"+jsonObject.toString(),null);
                    break;
                case 11:
                    //case11:再次获取DistinctID
                    writeToList("case11:再次获取DistinctID",null,SensorsDataAPI.sharedInstance().getDistinctId());
                    break;
                case 12:
                    //case12:track事件，查看DistinctID
                    SensorsDataAPI.sharedInstance().track("testLogin");
                    writeToList("case12:track事件，查看DistinctID","testLogin,id:liu",null);
                    break;
                case 13:
                    //case13:设置用户属性（首次）
                    jsonObject.remove("mobile");
                    jsonObject.put("computer","mac");
                    SensorsDataAPI.sharedInstance().profileSetOnce(jsonObject);
                    writeToList("case13:设置用户属性（首次）",jsonObject.toString(),null);
                    break;
                case 14:
                    //case14:设置用户属性（覆盖）
                    jsonObject.remove("computer");
                    jsonObject.put("book","从百草园到三味书屋");
                    SensorsDataAPI.sharedInstance().profileSet(jsonObject);
                    writeToList("case14：设置用户属性（覆盖）",jsonObject.toString(),null);
                    break;
                case 15:
                    //case15:用户属性值累加
                    SensorsDataAPI.sharedInstance().profileIncrement("level",25);
                    writeToList("case15:用户属性值累加","level:25",null);
                    break;
                case 16:
                    //case16:用户属性追加
                    SensorsDataAPI.sharedInstance().profileAppend("foodList","beef");
                    writeToList("case16:用户属性值追加","foodList:beef",null);
                    break;
                case 17:
                    //case17:设置推送ID
                    SensorsDataAPI.sharedInstance().profilePushId("pushID","123456");
                    writeToList("case17:设置推送ID","pushID:123456",null);
                    break;
                case 18:
                    SensorsDataAPI.sharedInstance().profileUnsetPushId("pushID");
                    break;
                case 19:
                    //case19:设置Item
                    jsonObject.remove("book");
                    jsonObject.put("itemTest","hello");
                    SensorsDataAPI.sharedInstance().itemSet("type","999",jsonObject);
                    writeToList("case19:设置Item","type,999,"+jsonObject.toString(),null);
                    //通知完成
                    Common.toast(getContext(),"用例执行完毕!");
                    //最后将测试日志写入到本地文件
//                    FileController.getFileControl().writeAutoTestLog(list);
                    break;
                case 20:
                    SensorsDataAPI.sharedInstance().itemDelete("type","999");
                    break;
                case 21:
                    Common.requestChannelUrl(getContext());
                    new Thread(){
                        @Override
                        public void run() {
                            super.run();
                            try {
                                sleep(3000);
                                SensorsDataAPI.sharedInstance().trackAppInstall();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }.start();
                    break;
                default:
                    break;
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void onClick(View view) {
        if (view.getId()==R.id.test_btn){
            handler.sendEmptyMessage(1);
        }

    }

    //防止handler内存泄露
    private static class MyHandler extends Handler {
        WeakReference<TestCaseFragment> reference;
        private MyHandler(TestCaseFragment fragment) {
            reference = new WeakReference<>(fragment);
        }
        int i=1;
        @Override
        public void handleMessage( Message msg) {
            if (reference!=null&&reference.get()!=null){
                if (msg.what==1){
                    if (i>21){
                        reference.get().handler.removeMessages(1);
                        return;
                    }
                    reference.get().runCase(i);
                    i++;
                    reference.get().handler.sendEmptyMessageDelayed(1,1000);
                }
            }

        }
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        if (handler!=null){
            handler.removeMessages(1);
        }
    }
}
