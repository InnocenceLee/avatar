package com.rkjh.eschool.dao;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/6/11.
 */
public class Pagination<T> {
    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }


    public int total;

    public List<T> rows;

    /**
     * 分页获取list中的数据
     * @param list
     * @param pageIndex 从0开始
     * @param pageSize
     * @return
     */
    public List<T> getPageList(List<T> list,  int pageIndex, int pageSize)
    {
        List<T> result = new ArrayList<T>();
        for (int i = 0; i < list.size(); i++) {
            //开始获取数据
            if(i >= pageIndex * pageSize
               && i < (pageIndex + 1) * pageSize)
            {
                result.add(list.get(i));
            }
        }
        return  result;
    }

}
