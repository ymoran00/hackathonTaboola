package application;

import api.Item;
import com.google.gson.GsonBuilder;
import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.config.HttpClientConfig;
import io.searchbox.client.config.HttpClientConfig.Builder;
import io.searchbox.core.DocumentResult;
import io.searchbox.core.Index;
import log.LogWrapper;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Guy.g
 * Date: 1/11/2017
 * Time: 6:58 PM
 * Copyright Taboola
 */
public class ElasticSearchUpdater {

    // JDBC driver name and database URL
    static final String DB_URL = "jdbc:mysql://qa_ads-01_db.service.qa-consul.taboolasyndication.com:3306/trc";

    //  Database credentials
    static final String USER = "trc";
    static final String PASS = "taboola";

    private static final LogWrapper logger = new LogWrapper(ElasticSearchUpdater.class);

    public static void update() throws Exception{
        Connection conn = null;
        Statement statement = null;
        ResultSet rs = null;

                JestClient client = createClient();

        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            logger.info("Connecting to a selected database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            logger.info("Connected database successfully...");

            //STEP 4: Execute a query
            logger.info("Creating statement...");
            statement = conn.createStatement();

            List<Long> successfulItems = new ArrayList<>();
            List<Long> failedItems = new ArrayList<>();
            String sql = "SELECT * FROM videosKnows2 WHERE status = 'SCRAPED'";

            //STEP 5: Extract data from result set
            rs = statement.executeQuery(sql);
            while (rs.next()) {

                long id = rs.getLong("id");
                String url = rs.getString("url");
                String thumbnailUrl = rs.getString("thumbnail_url");
                String text = rs.getString("text");
                Double ctr = rs.getDouble("ctr");
                String publisherName = rs.getString("publisher_name");
                String description = rs.getString("description");
                String title = rs.getString("title");
                Integer views = rs.getInt("views");

                String date = rs.getString("publish_date");
                Date parsedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.ms").parse(date);
                String parsedDateStr = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(parsedDate);


                Item item = new Item();
                item.setUrl(url);
                item.setThumbnailUrl(thumbnailUrl);
                item.setText(text);
                item.setCtr(ctr);
                item.setPublisher(publisherName);
                item.setDescription(description);
                item.setTitle(title);
                item.setDate(parsedDateStr);
                item.setViews(views);

                boolean isSuccessful = sendToElasticSearch(client, item, id);
                if (isSuccessful) {
                    successfulItems.add(id);
                } else {
                    failedItems.add(id);
                }

                updateVideoTable(conn, successfulItems, failedItems);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs != null) {
                rs.close();
            }
            client.shutdownClient();
            try {
                if (statement != null)
                    conn.close();
            } catch (SQLException ignored) {}
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
    }

    private static void updateVideoTable(Connection connection, List<Long> successfulItems, List<Long> failedItems) throws SQLException {
        Statement goodItemsStatement = null;
        Statement badItemsStatement = null;
        try {
            if (!isNullOrEmpty(successfulItems)) {
                goodItemsStatement = connection.createStatement();
                String sql = "UPDATE videosKnows2 set status = 'CLOSED' where id in (" + StringUtils.join(successfulItems.toArray(), ',') + ")";
                goodItemsStatement.execute(sql);
                logger.info("updated [%s] sababa items", successfulItems.size());
            }
            if (!isNullOrEmpty(failedItems)) {
                badItemsStatement = connection.createStatement();
                String sql = "UPDATE videosKnows2 set status = 'FAIL' where id in (" + StringUtils.join(failedItems.toArray(), ',') + ")";
                badItemsStatement.execute(sql);
                logger.info("updated [%s] not sababa items", failedItems.size());
            }

        } catch (SQLException e) {
            logger.error("error while updating video table", e);
        } finally {
            if (goodItemsStatement != null) {
                goodItemsStatement.close();
            }
            if (badItemsStatement != null) {
                badItemsStatement.close();
            }
        }
    }

    private static boolean sendToElasticSearch(JestClient client, Item item, long itemId) throws IOException {
        String json = new GsonBuilder().create()
                .toJson(item);
        Index index = new Index.Builder(json)
                .index("videos2")
                .type("item")
                .id(String.valueOf(itemId))
                .build();
        DocumentResult result = client.execute(index);

        boolean isSucceeded = result.isSucceeded();
        if (!isSucceeded) {
            logger.error("error adding item [%s], msg [%s]", item, result.getErrorMessage());
        }

        return isSucceeded;
    }

    public static JestClient createClient() throws UnknownHostException {
        HttpClientConfig config = new Builder("http://qa-backstage022.taboola.com:9200")
                .multiThreaded(true)
                .build();
        JestClientFactory jestClientFactory = new JestClientFactory();
        jestClientFactory.setHttpClientConfig(config);
        return jestClientFactory.getObject();
    }

    public static boolean isNullOrEmpty(List<?> list) {
        return list == null || list.isEmpty();
    }

    public static void main(String[] args) throws Exception {
//        update();
        while(true) {
            try {
                update();
            } catch (Exception e) {
                break;
            }
        }
    }
}
