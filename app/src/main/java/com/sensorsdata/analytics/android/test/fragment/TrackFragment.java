package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.core.business.exposure.SAExposureConfig;
import com.sensorsdata.analytics.android.sdk.core.business.exposure.SAExposureData;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/*
* 测试事件采集的fragment（代码埋点）
* */

public class TrackFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemSelectedListener {

    private  View view;
    private Button btn_preset,btn_null,btn_execute;
    private Spinner sp1,sp2;
    private ArrayAdapter<String> adapter1,adapter2;
    //用例集合
    private String[] cases={"无属性事件(eventName)","有属性事件(属性名)","有属性事件(属性值)","类型转换"};
    //事件名称集合/属性名集合，pos=5,6,7,8 分别设值
    private String[] names={"hello","HELLO","hello8","_hello","hello$","null","1024个s","1025个s","空字符串","$hello","8hello","@hello","你好","date","datetime",
            "distinct_id","event","events","first_id","id","original_id","device_id","properties","second_id","time","user_id","users","!","@","#","¥","%","&","^","*","(",")","-","+","="};
    //属性值集合
    private String[] values={"null","空字符串","value","你好","1024个s","1025个s","99","99.123","99.45678","9E15+0.1","-95E15-0.1","{}","{\"\"}","{\"255个s\"}",
    "{\"256个s\"}","{\"501个元素\"}","{1}","true","false","2019-08-01 11:11:11.111","2019-08-02 11:11:11","2019-08-03","1900-08-04","1899-08-05","2099-08-06", "2100-08-07",
            "2019-13-08","2019-08-32","2019-xx-09","2019-08-01 25:01:01","2019-08-01 23:61:02","2019-08-01 23:23:62","2019-08-01 23:23:23.1234"};
    //类型转换的属性值集合
    private String[] t_values={"数字0","数字1","数字99","布尔true","布尔false","{\"a\"}","空字符串","b","2019-08-01","true","false","0","1","100"};
    private String string1024s,string1025s,string255s,string256s;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view= inflater.inflate(R.layout.fragment_track, container, false);
        initViews();//初始化控件
        initEvents();//初始化事件
        initData();//初始化数据

        SAExposureConfig exposureConfig=new SAExposureConfig(1.0f,1,false);
        SAExposureData exposureData=new SAExposureData("btn_preset",null,null,exposureConfig);
        SensorsDataAPI.sharedInstance().addExposureView(btn_preset,exposureData);

        return view;
    }

    private void initViews(){

        btn_preset=view.findViewById(R.id.btn_preset);
        btn_null=view.findViewById(R.id.btn_null);
        btn_execute=view.findViewById(R.id.btn_execute);
        sp1=view.findViewById(R.id.sp1);
        sp2=view.findViewById(R.id.sp2);

    }

    private void initEvents(){

        btn_preset.setOnClickListener(this);
        btn_null.setOnClickListener(this);
        btn_execute.setOnClickListener(this);
        sp1.setOnItemSelectedListener(this);
        sp2.setOnItemSelectedListener(this);
    }

    private void  initData(){

        adapter1 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,cases);
        sp1.setAdapter(adapter1);
        adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,names);
        sp2.setAdapter(adapter2);
        string1024s=Common.getBigString(1024);
        string1025s=Common.getBigString(1025);
        string255s=Common.getBigString(255);
        string256s=Common.getBigString(256);
    }

    @Override
    public void onClick(View view) {

        //获取预置属性
        if (view.getId()==R.id.btn_preset){
            String value= SensorsDataAPI.sharedInstance().getPresetProperties().toString();
//            FileController.getFileControl().writeToLogFile("getPresetProperties()",null,value);
            Common.toast(this.getActivity().getApplicationContext(),value);
            System.out.println(SensorsDataAPI.sharedInstance().getPresetProperties().toString());
            SensorsDataAPI.sharedInstance().trackViewScreen(this);

        }
        //故意异常，让app崩溃
        if (view.getId()==R.id.btn_null){
            int i=1/0;
        }
        //根据sp1和sp2的位置,传入不同参数，执行不同接口
        if (view.getId()==R.id.btn_execute){
            String eventName=null,pv=null,pk=null;
            JSONObject properties=null;
            JSONArray array=null;
            int pos=sp2.getSelectedItemPosition();
            try{
                switch (sp1.getSelectedItemPosition()){
                    case 0:
                        //采集无属性事件根据sp2的位置，设置不同的参数
                        switch (pos){
                            case 5:
                                //eventName为null
                                eventName=null;
                                break;
                            case 6:
                                //eventName为1024个s
                                eventName=string1024s;
                                break;
                            case 7:
                                //eventName为1025个s
                                eventName=string1025s;
                                break;
                            case 8:
                                //eventName为""
                                eventName="";
                                break;
                            default:
                                //eventName直接取集合的值
                                eventName=names[pos];
                                break;
                        }
                        SensorsDataAPI.sharedInstance().track(eventName);
//                        FileController.getFileControl().writeToLogFile("track(eventName)",eventName,null);
                        break;
                    case 1:
                        //验证属性名称，eventName均取"woo"，属性值均取"testName"，根据sp2的位置，设置不同的属性名
                        eventName="woo";
                        pv="testName";
                        switch (pos){
                            case 5:
                                //属性名为null
                               // pk=null;
                                pk="$pas";
                                break;
                            case 6:
                                //属性名为1024个s
                                pk=string1024s;
                                break;
                            case 7:
                                //属性名为1025个s
                                pk=string1025s;
                                break;
                            case 8:
                                //属性名为""
                                pk="";
                                break;
                            default:
                                //属性名直接取集合的值
                                pk=names[pos];
                                break;
                        }
                        properties = new JSONObject();
                        properties.put(pk,pv);
                        SensorsDataAPI.sharedInstance().track(eventName,properties);
//                        FileController.getFileControl().writeToLogFile("track(eventName,properties)",eventName+","+properties.toString(),null);
                        break;
                    //采集有属性事件-验证属性值
                    case 2:
                        //验证属性值，eventName均取"woo"，属性名根据测试类型取，根据sp2的位置，设置不同的属性值
                        eventName="woo";
                        properties = new JSONObject();
                        switch (pos){
                            case 0:
                                //属性值为null
                                pk="STRING";
                                properties.put(pk,null);
                                break;
                            case 1:
                                //属性值为""
                                pk="STRING";
                                properties.put(pk,"");
                                break;
                            case 4:
                                //属性值为1024个s
                                pk="STRING";
                                properties.put(pk,string1024s);
                                break;
                            case 5:
                                //属性值为1025个s
                                pk="STRING";
                                properties.put(pk,string1025s);
                                break;
                            case 6:
                                //属性值为99
                                pk="NUMBER";
                                properties.put(pk,99);
                                break;
                            case 7:
                                //属性值为99.123
                                pk="NUMBER";
                                properties.put(pk,99.123);
                                break;
                            case 8:
                                //属性值为99.45678
                                pk="NUMBER";
                                properties.put(pk,99.45678);
                                break;
                            case 9:
                                //属性值为9E15+0.1
                                pk="NUMBER";
                                properties.put(pk,9E15+0.1);
                                break;
                            case 10:
                                //属性值为-9E15-0.1
                                pk="NUMBER";
                                properties.put(pk,-9E15-0.1);
                                break;
                            case 11:
                                //属性值为{}
                                pk="LIST";
                                array=new JSONArray();
                                properties.put(pk,array);
                                break;
                            case 12:
                                //属性值为{""}
                                pk="LIST";
                                array=new JSONArray();
                                array.put("");
                                properties.put(pk,array);
                                break;
                            case 13:
                                //属性值为{"255个s"}
                                pk="LIST";
                                array=new JSONArray();
                                array.put(string255s);
                                properties.put(pk,array);
                                break;
                            case 14:
                                //属性值为{"256个s"}
                                pk="LIST";
                                array=new JSONArray();
                                array.put(string256s);
                                properties.put(pk,array);
                                break;
                            case 15:
                                //属性值为501个元素
                                pk="LIST";
                                array=new JSONArray();
                                for (int i=0;i<501;i++){
                                    array.put(i+"");
                                }
                                properties.put(pk,array);
                                break;
                            case 16:
                                //属性值为{1}
                                pk="LIST";
                                array=new JSONArray();
                                array.put(1);
                                properties.put(pk,array);
                                break;
                            case 17:
                                //属性值为true
                                pk="BOOL";
                                properties.put(pk,true);
                                break;
                            case 18:
                                //属性值为false
                                pk="BOOL";
                                properties.put(pk,false);
                                break;
                            default:
                                //属性值为字符串类型或datetime类型，属性值直接从数组中找
                                if (pos>=2&&pos<=5){
                                    pk="STRING";
                                }else {
                                    //datetime类型，由于该属性名为预置属性，不能使用该名称
                                    pk="dt";
                                }
                                properties.put(pk,values[pos]);
                                break;
                        }
                        SensorsDataAPI.sharedInstance().track(eventName,properties);
//                        FileController.getFileControl().writeToLogFile("track(eventName,properties)",eventName+","+properties.toString(),null);
                        break;
                    case 3:
                        //类型转换，验证一个新的类型转换时，需要重置神策分析系统
                        eventName="transform";
                        pk="testTransform";
                        properties = new JSONObject();
                        switch (pos){
                            case 0:
                                //数字0
                                properties.put(pk,0);
                                break;
                            case 1:
                                //数字1
                                properties.put(pk,1);
                                break;
                            case 2:
                                //数字99
                                properties.put(pk,99);
                                break;
                            case 3:
                                //布尔true
                                properties.put(pk,true);
                                break;
                            case 4:
                                //布尔false
                                properties.put(pk,false);
                                break;
                            case 5:
                                //字符串{"a"}
                                array=new JSONArray();
                                array.put("a");
                                properties.put(pk,array);
                                break;
                            case 6:
                                //空字符串
                                properties.put(pk,"");
                                break;
                            default:
                                //字符串或日期时间格式，在String[]中直接取
                                properties.put(pk,t_values[pos]);
                                break;
                        }
                        SensorsDataAPI.sharedInstance().track(eventName,properties);
//                        FileController.getFileControl().writeToLogFile("track(eventName,properties)",eventName+","+properties.toString(),null);
                        break;
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }


    }


    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int i, long l) {

        //第一个spinner
        if (parent.getId()==R.id.sp1){
            //首先根据sp1的选择项，对sp2进行更新
            switch (i){
                case 0: case 1:
                    adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,names);
                    break;
                case 2:
                    adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,values);
                    break;
                case 3:
                    adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,t_values);
                    break;
            }
            sp2.setAdapter(adapter2);

        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
}
