package com.sensorsdata.analytics.android.test.activity;

import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseExpandableListAdapter;
import android.widget.CheckedTextView;
import android.widget.CompoundButton;
import android.widget.ExpandableListView;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.RatingBar;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.ToggleButton;

import com.sensorsdata.abtest.OnABTestReceivedData;
import com.sensorsdata.abtest.SensorsABTest;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataDynamicSuperProperties;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackViewOnClick;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.view.KeyBoardButton;
import com.sensorsdata.analytics.android.test.view.MyExpandableListView;
import com.sensorsdata.analytics.android.test.view.MyGridView;
import com.sensorsdata.analytics.android.test.view.MyListView;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ElementActivity extends AppCompatActivity implements View.OnClickListener, AdapterView.OnItemClickListener, CompoundButton.OnCheckedChangeListener, SeekBar.OnSeekBarChangeListener, RatingBar.OnRatingBarChangeListener, RadioGroup.OnCheckedChangeListener, AdapterView.OnItemSelectedListener {

    CheckedTextView checkedTextView;
    public String[] groupStrings = {"西游记", "水浒传", "三国演义", "红楼梦"};
    public String[][] childStrings = {
            {"唐三藏", "孙悟空", "猪八戒", "沙和尚"},
            {"宋江", "林冲", "李逵", "鲁智深"},
            {"曹操", "刘备", "孙权", "诸葛亮", "周瑜"},
            {"贾宝玉", "林黛玉", "薛宝钗", "王熙凤"}
    };
    private List<String> recyclerList = new ArrayList<>();
    private ImageView imageView;
    String TAG="ElementActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_element);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setDisplayShowHomeEnabled(true);
            actionBar.setTitle("全 View 页面");
        }
        intView();
        initListView();
        initExpandListView();
        initRecycleView();
        initGridView();
//        loadImage();
        imageView.setImageResource(R.mipmap.ic_launcher);
    }

    @SensorsDataTrackViewOnClick
    public void onMyClick(View view){

    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.e(TAG, "onPause: ================");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.e(TAG, "onResume: ================");
    }

    void intView(){

        KeyBoardButton keyBoardButton=findViewById(R.id.ele_key);
        keyBoardButton.setAction();

        findViewById(R.id.ele_btn).setOnClickListener(
                (View v)-> {

                    SensorsDataAPI.sharedInstance().trackAppInstall();
//                    SensorsDataAPI.enableSDK();
//                    SensorsDataAPI.sharedInstance().setServerUrl("http://10.120.111.143:8106/sa?project=default");
//                    Common.seedMessage(this);
//                    SensorsDataAPI.sharedInstance().unregisterPropertyPlugin(PropertyPlugin.getInstance());
//                    SensorsDataAPI.sharedInstance().unregisterPropertyPlugin(new PropertyPlugin());
//                    SensorsDataAPI.sharedInstance().unregisterPropertyPlugin(new PropertyPlugin2());

//                    SensorsDataAPI.sharedInstance().registerDynamicSuperProperties(new SensorsDataDynamicSuperProperties() {
//                        @Override
//                        public JSONObject getDynamicSuperProperties() {
//
//                            JSONObject object=new JSONObject();
//                            try {
//                                object.put("c_name","zhangsan");
//                            } catch (JSONException e) {
//                                e.printStackTrace();
//                            }
//                            return object;
//                        }
//                    });


                }


        );

        findViewById(R.id.ele_cb).setOnClickListener(this);
        checkedTextView= findViewById(R.id.ele_ctv);
        checkedTextView.setOnClickListener(this);
        findViewById(R.id.ele_ib).setOnClickListener(this);
        imageView=findViewById(R.id.ele_iv);
        imageView.setOnClickListener(this);
        findViewById(R.id.ele_rb).setOnClickListener(this);
        findViewById(R.id.ele_tv).setOnClickListener(this);
        findViewById(R.id.ele_et).setOnClickListener(this);
        RadioGroup radioGroup= findViewById(R.id.ele_rg);
        radioGroup.setOnCheckedChangeListener(this);
        RatingBar ratingBar=findViewById(R.id.ele_rbar);
        ratingBar.setOnRatingBarChangeListener(this);
        SeekBar seekBar=findViewById(R.id.ele_sb);
        seekBar.setOnSeekBarChangeListener(this);
        Spinner spinner=findViewById(R.id.ele_sp);
        spinner.setOnItemSelectedListener(this);
        Switch sw=findViewById(R.id.ele_sw);
        sw.setOnCheckedChangeListener(this);
        ToggleButton toggleButton=findViewById(R.id.ele_tb);
        toggleButton.setOnCheckedChangeListener(this);
    }

    @Override
    public void onClick(View view) {

        Log.e("onClick", "visual debug info:==========AppClick=====================");
        if (view.getId()==R.id.ele_ctv){
            checkedTextView.toggle();
        }



    }

    @Override
    public void onCheckedChanged(RadioGroup radioGroup, int i) {

    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {

    }

    @Override
    public void onRatingChanged(RatingBar ratingBar, float v, boolean b) {

    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {

    }

    private void initListView() {
        MyListView listView = findViewById(R.id.ele_lv);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

            }
        });
    }


    private void initExpandListView() {
        MyExpandableListView expandableListView = findViewById(R.id.ele_exlv);
        expandableListView.setAdapter(new MyExpandableAdapter());
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

    private void initRecycleView() {
        int count = 10;
        while(count-- > 0) {
            recyclerList.add("测试Item：" + count);
        }

        RecyclerView recyclerView = findViewById(R.id.ele_rv);
        recyclerView.setAdapter(new MyRecyclerAdapter());
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setLayoutManager(layoutManager);
    }

    private void initGridView(){
        ArrayList<String> data=new ArrayList<>();
        for (int i=0;i<100;i++){
            data.add(i+"");
//            data.add("a");
        }
        MyGridView mGridView =findViewById(R.id.ele_gv);
        mGridView.setHaveScrollbar(false);
        ArrayAdapter<String> adapter=new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,data);
        mGridView.setAdapter(adapter);
        mGridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                System.out.println(i+"项");
            }
        });
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
            TextView textView = (TextView) getLayoutInflater().inflate(android.R.layout.simple_expandable_list_item_1, parent, false);
            textView.setText(groupStrings[groupPosition]);
            return textView;
        }

        @Override
        public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
            TextView textView = (TextView) getLayoutInflater().inflate(android.R.layout.simple_expandable_list_item_1, parent, false);
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
            return new ViewHolder(new TextView(ElementActivity.this));
        }

        @Override
        public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
            viewHolder.textView.setText(recyclerList.get(i));
            viewHolder.textView.setOnClickListener(new View.OnClickListener(){

                @Override
                public void onClick(View v) {
                    Log.e("SA.S", "visual debug info:==========AppClick=====================");


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

    private void loadImage(){

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Picasso.get().load("https://sensorsdata.cn/assets/img/qr252_57e4a83.png").config(Bitmap.Config.HARDWARE).into(new Target() {
                @Override
                public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                     imageView.setImageBitmap(bitmap);

                }

                @Override
                public void onBitmapFailed(Exception e, Drawable errorDrawable) {

                }

                @Override
                public void onPrepareLoad(Drawable placeHolderDrawable) {

                }
            });
        }else {
            imageView.setImageResource(R.mipmap.ic_launcher);
        }

    }



}