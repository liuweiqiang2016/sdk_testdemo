package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LogFragment extends Fragment {

    private ListView listView;
    private ArrayList<String> list;
    private  List<String> temp;
    private StringBuffer stringBuffer;
    private ArrayList<String> logList;
    private ArrayAdapter<String> adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_log, container, false);
        listView=view.findViewById(R.id.lv);
        list=new ArrayList<String>();
        stringBuffer=new StringBuffer();
        refreshUI();
        return view;
    }
    public void refreshUI(){
        logList=FileController.getFileControl().readLogFromFile(Common.LOG_MANUAL);
        if (logList!=null){
            //为防止日志过多，暂时取最新80条（每四条list数据，代表一条日志，意味着取最新的20条日志
            if (logList.size()>80){
                temp=logList.subList(logList.size()-80,logList.size());
            }else {
                temp=logList;
            }
            //清空list
            if (list!=null){list.clear();}
            /*
            重新组装list,直接传logList会导致每一条日志的4部分（时间、接口、参数、返回）分别展示在每一个item上
            为了让listView的每个item展示一条日志，需要进行以下处理
            如果希望展示所有的日志请使用logList,如果希望展示最新的20条使用temp
            * */
            for (int i=0;i<temp.size();i++){
                //为了让日志看起来更美观，加一个空行
                stringBuffer.append(temp.get(i)+"\n"+""+"\n");
                //整除4，stringBuffer清空，说明一条日志组装完毕，需要组装下一条日志
                if ((i+1)%4==0){
                    list.add(stringBuffer.toString());
                    stringBuffer.delete(0,stringBuffer.length());
                }
            }
            //list倒叙
            Collections.reverse(list);
        }
        adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,list);
        listView.setAdapter(adapter);
    }
}
