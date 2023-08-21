package com.sensorsdata.analytics.android.test.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;

import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.fragment.ABFragment;
import com.sensorsdata.analytics.android.test.fragment.AdvancedFragment;
import com.sensorsdata.analytics.android.test.fragment.AgentFragment;
import com.sensorsdata.analytics.android.test.fragment.AnnotationFragment;
import com.sensorsdata.analytics.android.test.fragment.AutoSettingFragment;
import com.sensorsdata.analytics.android.test.fragment.ControlFragment;
import com.sensorsdata.analytics.android.test.fragment.DataFragment;
import com.sensorsdata.analytics.android.test.fragment.HeatFragment;
import com.sensorsdata.analytics.android.test.fragment.InitFragment;
import com.sensorsdata.analytics.android.test.fragment.LogFragment;
import com.sensorsdata.analytics.android.test.fragment.MoreWebFragment;
import com.sensorsdata.analytics.android.test.fragment.NetworkPolicyFragment;
import com.sensorsdata.analytics.android.test.fragment.POPFragment;
import com.sensorsdata.analytics.android.test.fragment.PushFragment;
import com.sensorsdata.analytics.android.test.fragment.SSFragment;
import com.sensorsdata.analytics.android.test.fragment.TestFunctionFragment;
import com.sensorsdata.analytics.android.test.fragment.ToolFragment;
import com.sensorsdata.analytics.android.test.fragment.SuperPropertiesFragment;
import com.sensorsdata.analytics.android.test.fragment.TestCaseFragment;
import com.sensorsdata.analytics.android.test.fragment.TimerFragment;
import com.sensorsdata.analytics.android.test.fragment.TrackFragment;
import com.sensorsdata.analytics.android.test.fragment.UsersRelatedFragment;
import com.sensorsdata.analytics.android.test.fragment.VisualizedFragment;
import com.sensorsdata.analytics.android.test.fragment.WebFragment;
import com.sensorsdata.analytics.android.test.fragment.X5Fragment;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.fragment.ViewPagerTestFragment;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
//根据不同type动态显示不同布局
public class ViewActivity extends AppCompatActivity {

    //声明ViewPager
    private ViewPager mViewPager;
    //适配器
    private FragmentPagerAdapter mAdapter;
    //装载Fragment的集合
    private List<Fragment> fragments = new ArrayList<>();
    //装载底部标题
    private List<String> titles = new ArrayList<>();
    private TabLayout tabLayout;
    //根据不同的type，展示不同布局
    private String type;
    private LogFragment logFragment;
    private WebFragment webFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setDisplayShowHomeEnabled(true);
            actionBar.setTitle("View 页面");
        }
//        setTitle("View 页面");
        //根据type决定展示哪个布局
        type = getIntent().getStringExtra(Common.INTENT_TYPE);
        setFragment(type);
        init();//初始化布局
        Log.e("", "onCreate: " );

    }

    //初始化控件
    private void init() {
        mViewPager = findViewById(R.id.viewpager);
        tabLayout = findViewById(R.id.vb_tab);
        //初始化适配器
        mAdapter = new FragmentPagerAdapter(getSupportFragmentManager()) {
            @Override
            public Fragment getItem(int position) {//从集合中获取对应位置的Fragment
                return fragments.get(position);
            }

            @Override
            public int getCount() {//获取集合中Fragment的总数
                return fragments.size();
            }

            @Nullable
            @Override
            public CharSequence getPageTitle(int position) {
                //viewpager的底部标题
                return titles.get(position);
            }
        };
        //不要忘记设置ViewPager的适配器
        mViewPager.setAdapter(mAdapter);
        //设置ViewPager的切换监听
        mViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            //页面滚动事件
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }
            //页面选中事件
            @Override
            public void onPageSelected(int position) {
                //设置position对应的集合中的Fragment
                mViewPager.setCurrentItem(position);
                if (titles.get(position).equals("操作日志")){
                    if (logFragment!=null){
                        logFragment.refreshUI();
                    }
                }
            }
            @Override
            //页面滚动状态改变事件
            public void onPageScrollStateChanged(int state) {

            }
        });
        //实现TabLayout和viewpager联动
        tabLayout.setupWithViewPager(mViewPager);


        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
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

    //根据不同的type，设置不同fragment
    private void setFragment(String type) {
        //首先清空fragments和titles
        if (fragments != null) {
            fragments.clear();
        }
        if (titles != null) {
            titles.clear();
        }
        switch (type) {
            case "事件相关":
                fragments.add(new TrackFragment());
                titles.add("事件采集");//事件采集
                fragments.add(new SuperPropertiesFragment());
                titles.add("公共属性");//公共属性
                fragments.add(new TimerFragment());
                titles.add("计时器");//计时器
                break;
            case "全埋点":
                fragments.add(new AutoSettingFragment());
                titles.add("view");//view相关
//                fragments.add(new AutoTrackFragment());
//                titles.add("全埋点");//全埋点
                fragments.add(new ControlFragment());
                titles.add("fragment");//fragment测试
                fragments.add(new ViewPagerTestFragment());
                titles.add("ViewPager");//viewPager
                break;
            case "可视化全埋点和点击图":
                fragments.add(new VisualizedFragment());
                titles.add("可视化全埋点");//可视化全埋点
                fragments.add(new HeatFragment());
                titles.add("点击图");//点击图
                break;
            case "用户相关及数据上报":
                fragments.add(new NetworkPolicyFragment());
                titles.add("网络策略");//网络上传策略
                fragments.add(new DataFragment());
                titles.add("数据上报");//数据上报
                fragments.add(new UsersRelatedFragment());
                titles.add("用户相关");
                break;
            case "注解与高级功能":
                fragments.add(new AnnotationFragment());
                titles.add("注解测试");//注解
                fragments.add(new AdvancedFragment());
                titles.add("高级功能");//高级功能
                break;
            case "自动化及全接口测试":
                fragments.add(new TestCaseFragment());
                titles.add("自动化测试");//自动化测试
                fragments.add(new TestFunctionFragment());
                titles.add("全接口验证");//全接口验证
                break;
            case "小工具":
                fragments.add(new ToolFragment());
                titles.add("小工具");//小工具
                break;
            case "弹窗/AB/推送点击":
                fragments.add(new POPFragment());
                titles.add("弹窗测试");//弹窗测试
                fragments.add(new ABFragment());
                titles.add("AB 测试");//AB 测试
                fragments.add(new PushFragment());
                titles.add("推送点击");
                break;
            case "原生WebView":
                webFragment=new WebFragment();
                fragments.add(webFragment);
//                fragments.add(new SSFragment());
                titles.add("SSWebView");
                break;
            case "腾讯X5WebView":
                fragments.add(new X5Fragment());
                titles.add("腾讯 X5WebView");
                break;
            case "第三方库Agent":
                fragments.add(new AgentFragment());
                titles.add("第三方库 Agent");
                break;
            case "多个WebView":
                fragments.add(new MoreWebFragment());
                titles.add("多个 WebView");
                break;
            default:
                break;
        }

    }

    @Override
    public void onBackPressed() {
        if (webFragment!=null&&!webFragment.isIndexPage()){
            webFragment.goBack();
        }else {
            super.onBackPressed();
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

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.e("onDestroy", "销毁了...................");
    }
}
