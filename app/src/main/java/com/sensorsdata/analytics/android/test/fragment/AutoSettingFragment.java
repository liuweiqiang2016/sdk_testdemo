package com.sensorsdata.analytics.android.test.fragment;


import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.SwitchCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ExpandableListView;
import android.widget.GridView;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RatingBar;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TabHost;
import android.widget.TextView;

import com.sensorsdata.analytics.android.sdk.ScreenAutoTracker;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.activity.ViewClickActivity;
import com.sensorsdata.analytics.android.test.model.TestListener;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/*
* 对全埋点场景下，相关view的设置进行测试，验证这些设置是否有效
* */
public class AutoSettingFragment extends Fragment implements AdapterView.OnItemClickListener, View.OnClickListener,ScreenAutoTracker {

    private ListView listView;
    private Button btn_setid;
    private String[] cases={"自定义viewScreen(url,properties)","自定义$AppClick", "忽略某些类型控件的$AppClick",
            "获取忽略类型view集合","忽略某个控件","忽略某个控件,true","忽略某个控件,false","设置元素id(view)","设置元素id(dialog)",
            "设置元素id(alertDialog)","验证各控件监听事件传入null","手动采集$AppClick(预置属性)","手动采集$AppClick(自定义属性)","忽略listView点击事件"};


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_auto_setting, container, false);
        listView=view.findViewById(R.id.lv);
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,cases);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);

        btn_setid=view.findViewById(R.id.btn_setid);
        btn_setid.setOnClickListener(this);

        //手动采集fragment
//        SensorsDataAPI.sharedInstance().trackViewScreen(this);

        return view;
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        JSONObject properties=null;
        switch (i){
//            case 0:
//                //验证各控件的$AppClick
//                Intent intent=new Intent(getActivity(), ViewClickActivity.class);
//                startActivity(intent);
//                break;
            case 0:
                //自定义viewScreen
                properties=new JSONObject();
                try {
                    properties.put("case3","case3");
                    //使用trackViewScreen，自定义属性时，$screen_name\$title，修改的值，$AppClick 不会随之改变
                    properties.put("$screen_name","test_screen_name2");
                    properties.put("$title","test_title2");
                    properties.put("$os","test_os");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                SensorsDataAPI.sharedInstance().trackViewScreen("www.google.com",properties);
//                FileController.getFileControl().writeToLogFile("trackViewScreen(url,properties)","google,"+properties.toString(),null);
                break;
            case 1:
                //自定义$AppClick
                properties=new JSONObject();
                try {
                    properties.put("case4","case4");
                    properties.put("$screen_name","test_screen_name3");
                    properties.put("$title","test_title3");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                SensorsDataAPI.sharedInstance().setViewProperties(btn_setid,properties);
//                FileController.getFileControl().writeToLogFile("setViewProperties(view,properties)","view:"+view.getId()+",properties:"+properties.toString(),null);
                break;
            case 2:
                //忽略某些类型控件$AppClick
                List<Class<?>> list=new ArrayList<>();
                list.add(CheckBox.class);
                list.add(RadioButton.class);
                list.add(Button.class);
                list.add(SwitchCompat.class);
                list.add(Spinner.class);
                list.add(TextView.class);
                list.add(ImageView.class);
                list.add(ImageButton.class);
                list.add(SeekBar.class);
                list.add(RatingBar.class);
                list.add(RadioGroup.class);
                list.add(ExpandableListView.class);
                list.add(Dialog.class);
                list.add(ListView.class);
                list.add(GridView.class);
                list.add(TabHost.class);
                for (Class<?> item:list){
                    SensorsDataAPI.sharedInstance().ignoreViewType(item);
                }
//                FileController.getFileControl().writeToLogFile("ignoreViewType(type)",list.toString(),null);
                break;
            case 3:
                //获取忽略view类型的集合
//                FileController.getFileControl().writeToLogFile("getIgnoredViewTypeList()",null,SensorsDataAPI.sharedInstance().getIgnoredViewTypeList().toString());
                break;
            case 4:
                //忽略某个控件
                SensorsDataAPI.sharedInstance().ignoreView(btn_setid);
//                FileController.getFileControl().writeToLogFile("ignoreView(view)",btn_setid.toString(),null);
                break;
            case 5:
                //忽略某个控件,true
                SensorsDataAPI.sharedInstance().ignoreView(btn_setid,true);
//                FileController.getFileControl().writeToLogFile("ignoreView(view,bool)",btn_setid.toString()+",true",null);
                break;
            case 6:
                //忽略某个控件,false
                SensorsDataAPI.sharedInstance().ignoreView(btn_setid,false);
//                FileController.getFileControl().writeToLogFile("ignoreView(view,bool)",btn_setid.toString()+",false",null);
                break;
            case 7:
                //设置元素id
                SensorsDataAPI.sharedInstance().setViewID(btn_setid,"where-how");
//                FileController.getFileControl().writeToLogFile("setViewID(view,id)",btn_setid.toString()+",where-how",null);
                break;
            case 8:
//                Dialog dialog=new Dialog(getActivity());
//                dialog.setContentView(R.layout.dialog_test);
//                Button btn=dialog.findViewById(R.id.dialog_sure);
//                btn.setOnClickListener(this);
//                dialog.show();
//                SensorsDataAPI.sharedInstance().setViewID(dialog,"R.id.dialog");
//                FileController.getFileControl().writeToLogFile("setViewID(dialog,id)",dialog.toString()+",R.id.dialog",null);
                break;
            case 9:
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                //设置Title的内容
                builder.setTitle("弹出框");
                //设置Content来显示一个信息
                builder.setMessage("hello");
                builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Common.toast(getContext(),"确定");
                    }
                });
                builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Common.toast(getActivity(),"取消");
                    }
                });
                AlertDialog dialog1=builder.create();
                dialog1.show();
                SensorsDataAPI.sharedInstance().setViewID(dialog1,"R.id.alertDialog");
//                FileController.getFileControl().writeToLogFile("setViewID(builder,R.id.alertDialog)",builder.toString()+",R.id.alertDialog",null);
                break;
            case 10:
                TestListener listener=new TestListener();
                listener.onClick(null);
                listener.onItemClick(null,null,0,0);
                listener.onCheckedChanged(null,0);
                listener.onCheckedChanged(null,false);
                listener.onClick(null,0);
                listener.onChildClick(null,null,0,0,0);
                listener.onMenuItemClick(null);
                listener.onProgressChanged(null,0,false);
                listener.onRatingChanged(null,0,false);
                listener.onStartTrackingTouch(null);
                listener.onStopTrackingTouch(null);
                listener.onTabChanged(null);
                listener.onGroupClick(null,null,0,0);
                break;
            case 11:
                //手动采集$AppClick(预置属性)
                SensorsDataAPI.sharedInstance().trackViewAppClick(btn_setid);
//                FileController.getFileControl().writeToLogFile("trackViewAppClick(view)","btn_setid",null);
                break;
            case 12:
                //手动采集$AppClick(自定义属性)
                properties=new JSONObject();
                try {
                    properties.put("sport","football");
                    properties.put("case4","aaa");
                    properties.put("$screen_name","test");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                SensorsDataAPI.sharedInstance().trackViewAppClick(btn_setid,properties);
//                FileController.getFileControl().writeToLogFile("trackViewAppClick(view,properties)","btn_setid,"+properties.toString(),null);
                break;

            case 13:
                //测试listView的点击事件是否能忽略成功，v3.2.2以前的版本，无法忽略
                SensorsDataAPI.sharedInstance().ignoreView(listView);
//                FileController.getFileControl().writeToLogFile("ignoreView(view)","listView",null);
                break;
        }

    }

    @Override
    public void onClick(View view) {

    }

    @Override
    public String getScreenUrl() {
        return "AutoSettingFragment";
    }

    @Override
    public JSONObject getTrackProperties() throws JSONException {
        JSONObject properties=new JSONObject();
        //自定义属性时，$screen_name\$title，修改的值，$AppClick 会随之改变，但其他值不会改变（例如其他预置属性、其他自定义属性）
        properties.put("AutoSetting","test");
        properties.put("$screen_name","test_screen_name");
        properties.put("$title","test_title");
//        properties.put("$os","test_os");
        return properties;
    }
}
