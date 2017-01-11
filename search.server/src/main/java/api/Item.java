package api;

import java.util.Date;

/**
 * Created by Guy.g
 * Date: 1/11/2017
 * Time: 1:55 PM
 * Copyright Taboola
 */
public class Item {

    private String title;
//    private String imageUrl;
//    private String publisherName;
//    private String summary;
//    private Date date;
//    private ItemQuality quality;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Item{" +
                "title='" + title + '\'' +
                '}';
    }
}
