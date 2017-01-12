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
    private String thumbnailUrl;
    private String publisher;
    private String description;
    private String date;
    private String text;
    private String url;
    private double ctr;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public double getCtr() {
        return ctr;
    }

    public void setCtr(double ctr) {
        this.ctr = ctr;
    }

    @Override
    public String toString() {
        return "Item{" +
                "title='" + title + '\'' +
                ", thumbnailUrl='" + thumbnailUrl + '\'' +
                ", publisher='" + publisher + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", text='" + text + '\'' +
                ", url='" + url + '\'' +
                ", ctr=" + ctr +
                '}';
    }
}
