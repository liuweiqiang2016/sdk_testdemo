package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseExpandableListAdapter;
import android.widget.ExpandableListView;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.TextView;

import com.sensorsdata.analytics.android.sdk.ScreenAutoTracker;
import com.sensorsdata.analytics.android.test.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class ListClickFragment extends Fragment implements View.OnClickListener, ScreenAutoTracker {
    public String[] groupStrings = {"西游记", "水浒传", "三国演义", "红楼梦"};
    public String[][] childStrings = {
            {"唐三藏", "孙悟空", "猪八戒", "沙和尚"},
            {"宋江", "林冲", "李逵", "鲁智深"},
            {"曹操", "刘备", "孙权", "诸葛亮", "周瑜"},
            {"贾宝玉", "林黛玉", "薛宝钗", "王熙凤"}
    };
    private List<String> recyclerList = new ArrayList<>();
    public ListClickFragment() {
        // Required empty public constructor
    }
    //头部和尾部
    private TextView tv_header,tv_footer,tv_header1,tv_footer1;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_list_click, container, false);
        tv_header=(TextView) LayoutInflater.from(getContext()).inflate(R.layout.tv_header, null);
        tv_footer=(TextView) LayoutInflater.from(getContext()).inflate(R.layout.tv_footer, null);
        tv_header1=(TextView) LayoutInflater.from(getContext()).inflate(R.layout.tv_header, null);
        tv_footer1=(TextView) LayoutInflater.from(getContext()).inflate(R.layout.tv_footer, null);

        initListView(view);
        initExpandListView(view);
        initRecycleView(view);
        initGridView(view);

        return view;
    }

    private void initListView(View view) {
        ListView listView = view.findViewById(R.id.listView);
//        listView.addHeaderView(tv_header);
//        listView.addFooterView(tv_footer);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

            }
        });
    }


    private void initExpandListView(View view) {
        ExpandableListView expandableListView = view.findViewById(R.id.expandableListView);
        expandableListView.setAdapter(new MyExpandableAdapter());
//        expandableListView.addHeaderView(tv_header);
//        expandableListView.addFooterView(tv_footer);
//        tv_header1.setOnClickListener(this);
//        tv_footer1.setOnClickListener(this);
        expandableListView.setOnGroupClickListener(new ExpandableListView.OnGroupClickListener() {
            @Override
            public boolean onGroupClick(ExpandableListView parent, View v, int groupPosition, long id) {
                return false;
            }
        });

        expandableListView.setOnChildClickListener(new ExpandableListView.OnChildClickListener() {
            @Override
            public boolean onChildClick(ExpandableListView parent, View v, int groupPosition, int childPosition, long id) {
                return false;
            }
        });
    }

    private void initRecycleView(View view) {
        int count = 20;
        while(count-- > 0) {
            recyclerList.add("测试Item：" + count);
        }

        RecyclerView recyclerView = view.findViewById(R.id.recyclerView);
        recyclerView.setAdapter(new MyRecyclerAdapter());
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setLayoutManager(layoutManager);
    }

    private void initGridView(View view){
        ArrayList<String> data=new ArrayList<>();
        for (int i=0;i<12;i++){
            data.add(i+"");
        }
        GridView mGridView =view.findViewById(R.id.list_gv);
        ArrayAdapter<String> adapter=new ArrayAdapter<>(getContext(),android.R.layout.simple_list_item_1,data);
        mGridView.setAdapter(adapter);
        mGridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                System.out.println(i+"项");
            }
        });
    }

    @Override
    public void onClick(View view) {

    }

    @Override
    public String getScreenUrl() {
        return "url_listClickFragment";
    }

    @Override
    public JSONObject getTrackProperties() throws JSONException {
        JSONObject properties=new JSONObject();
        //使用trackViewScreen，自定义属性时，$screen_name\$title，修改的值，$AppClick 会随之改变，但其他值不会改变（例如其他预置属性、其他自定义属性）
        properties.put("haha","123");
//        properties.put("$screen_name","name_listClick");
//        properties.put("$title","title_listClick");
//        properties.put("$os","test_os");
        return properties;
    }


    class MyExpandableAdapter extends BaseExpandableListAdapter {

        @Override
        public int getGroupCount() {
            return groupStrings.length;
        }

        @Override
        public int getChildrenCount(int groupPosition) {
            return childStrings[groupPosition].length;
        }

        @Override
        public Object getGroup(int groupPosition) {
            return groupStrings[groupPosition];
        }

        @Override
        public Object getChild(int groupPosition, int childPosition) {
            return childStrings[groupPosition][childPosition];
        }

        @Override
        public long getGroupId(int groupPosition) {
            return groupPosition;
        }

        @Override
        public long getChildId(int groupPosition, int childPosition) {
            return childPosition;
        }

        @Override
        public boolean hasStableIds() {
            return true;
        }

        @Override
        public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
            TextView textView = (TextView) getActivity().getLayoutInflater().inflate(android.R.layout.simple_expandable_list_item_1, parent, false);
            textView.setText(groupStrings[groupPosition]);
            return textView;
        }

        @Override
        public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
            TextView textView = (TextView) getActivity().getLayoutInflater().inflate(android.R.layout.simple_expandable_list_item_1, parent, false);
            textView.setText(childStrings[groupPosition][childPosition]);
            return textView;
        }

        @Override
        public boolean isChildSelectable(int groupPosition, int childPosition) {
            return true;
        }
    }

    class MyRecyclerAdapter extends RecyclerView.Adapter<ViewHolder> {

        @NonNull
        @Override
        public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
            return new ViewHolder(new TextView(getActivity()));
        }

        @Override
        public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
            viewHolder.textView.setText(recyclerList.get(i));
            viewHolder.textView.setOnClickListener(new View.OnClickListener(){

                @Override
                public void onClick(View v) {

                }
            });
        }

        @Override
        public int getItemCount() {
            return recyclerList.size();
        }
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        public TextView textView;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            textView = (TextView) itemView;
        }
    }
}
