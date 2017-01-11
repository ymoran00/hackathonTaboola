import de.l3s.boilerpipe.BoilerpipeProcessingException;
import de.l3s.boilerpipe.extractors.ArticleExtractor;

import java.net.MalformedURLException;
import java.net.URL;


import java.sql.*;
/**
 * Created by dotan.b on 1/11/17.
 */
public class VideosTableUpdater {


    // JDBC driver name and database URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://qa_ads-01_db.service.qa-consul.taboolasyndication.com:3306/trc";

    //  Database credentials
    static final String USER = "trc";
    static final String PASS = "taboola";

    private static Connection conn = null;
    private static Statement stmt2 = null;


/*
    private String getPublisherName(int publisherId){
        String sql = "SELECT name FROM publishers WHERE id = publisherId";
        ResultSet rs = stmt.executeQuery(sql);


    }
*/

    private static void setConnection(){
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Connected database successfully...");
            //STEP 4: Execute a query
            System.out.println("Creating statement...");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private  static void updateTable(){

        String sql = "SELECT * FROM videosKnows2 WHERE status = NULL LIMIT 10";
        ResultSet rs = null;
        try {
            stmt2 = conn.createStatement();
            rs = stmt2.executeQuery(sql);

            //STEP 5: Extract data from result set
            while (rs.next()) {
                updateRow(rs);
            }

            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }




    private  static void updateRow(ResultSet rs) {
        try {

            URL url = new URL(rs.getString("url"));
            long id = rs.getLong("id");

            String text = ArticleExtractor.INSTANCE.getText(url);

            String sql = "UPDATE videosKnows2 SET text = ?, status = ?  WHERE id = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1,text);
            stmt.setString(2,"SCRAPED");
            stmt.setLong(3,id);
            stmt.executeQuery(sql);


        } catch (BoilerpipeProcessingException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {
        setConnection();
        updateTable();
    }



}

