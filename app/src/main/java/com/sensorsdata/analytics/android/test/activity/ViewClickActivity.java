package com.sensorsdata.analytics.android.test.activity;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.GravityCompat;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.fragment.DialogClickFragment;
import com.sensorsdata.analytics.android.test.fragment.ListClickFragment;
import com.sensorsdata.analytics.android.test.fragment.TabLayoutFragment;
import com.sensorsdata.analytics.android.test.fragment.ViewClickFragment;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

public class ViewClickActivity extends AppCompatActivity {

    private Fragment[] fragments = new Fragment[]{new ViewClickFragment(), new ListClickFragment(), new DialogClickFragment(),new TabLayoutFragment()};
    private TabLayout tabLayout;
    private ViewPager viewPager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_click);
        setTitle("ViewClick 页面");
        Log.e("SA.S", "onItemClick: "+SensorsDataAPI.sharedInstance().getLastScreenUrl());

        //SensorsDataAPI.sharedInstance().trackViewScreen(this);
//        FileController.getFileControl().writeToLogFile("trackViewScreen(activity)","ViewClickActivity",null);

        tabLayout = findViewById(R.id.tabLayout);
        viewPager = findViewById(R.id.viewPager);
        viewPager.setAdapter(new FragmentPager(getSupportFragmentManager()));
        tabLayout.setupWithViewPager(viewPager);
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
        initDrawerLayout();
    }


    private void initDrawerLayout() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // toolbar 这里设置的 menu 监听，会与 onOptionsItemSelected 相冲突,如果需要验证该接口，可以放开此处注释
//        toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
//            @Override
//            public boolean onMenuItemClick(MenuItem item) {
//                Common.toast(ViewClickActivity.this,"1234");
//                return false;
//            }
//        });
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();
        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                int id = menuItem.getItemId();
                if (id == R.id.nav_camera) {
                    Toast.makeText(ViewClickActivity.this, "nav_camera", Toast.LENGTH_SHORT).show();
                } else if (id == R.id.nav_gallery) {
                    Toast.makeText(ViewClickActivity.this, "nav_gallery", Toast.LENGTH_SHORT).show();
                } else if (id == R.id.nav_slideshow) {
                    Toast.makeText(ViewClickActivity.this, "nav_slideshow", Toast.LENGTH_SHORT).show();
                } else if (id == R.id.nav_tools) {
                    Toast.makeText(ViewClickActivity.this, "nav_tools", Toast.LENGTH_SHORT).show();
                } else if (id == R.id.nav_share) {
                    Toast.makeText(ViewClickActivity.this, "nav_share", Toast.LENGTH_SHORT).show();
                } else if (id == R.id.nav_send) {
                    Toast.makeText(ViewClickActivity.this, "nav_send", Toast.LENGTH_SHORT).show();
                }
                return true;
            }
        });
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }


    class FragmentPager extends FragmentPagerAdapter {

        public FragmentPager(FragmentManager fm) {
            super(fm);
        }

        @Override
        public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
            return super.isViewFromObject(view, object);
        }

        @Override
        public int getItemPosition(@NonNull Object object) {
            return super.getItemPosition(object);
        }

        @Override
        public Fragment getItem(int i) {
            return fragments[i];
        }

        @Override
        public int getCount() {
            return fragments.length;
        }

        @Nullable
        @Override
        public CharSequence getPageTitle(int position) {
            switch (position) {
                case 0:
                    return "基本控件点击";
                case 1:
                    return "列表控件点击";
                case 2:
                    return "对话框点击";
                case 3:
                    return "TabLayout 页面";
                default:
                    return "其它";
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //菜单填充
        getMenuInflater().inflate(R.menu.menu_def, menu);
        //使菜单显示出来
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.menu_share:
                Common.toast(this,"share");
                break;
            case R.id.menu_send:
                Common.toast(this,"send");
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    //Activity销毁时，终止该Activity的进程
    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

}
