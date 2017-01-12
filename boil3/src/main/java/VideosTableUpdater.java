import de.l3s.boilerpipe.BoilerpipeProcessingException;
import de.l3s.boilerpipe.extractors.ArticleExtractor;

import java.net.MalformedURLException;
import java.net.URL;


import java.sql.*;
/**
 * Created by dotan.b on 1/11/17.
 */
public class VideosTableUpdater implements Runnable{

    public VideosTableUpdater(int modulo_number) {
        this.modulo_number = modulo_number;
    }

    // JDBC driver name and database URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://qa_ads-01_db.service.qa-consul.taboolasyndication.com:3306/trc";

    //  Database credentials
    static final String USER = "trc";
    static final String PASS = "taboola";

    private  Connection conn = null;
    private  Statement stmt = null;

    private int modulo_number;
    private  int passCounter = 0;
    private  int counter = 0;

    @Override
    public void run(){
        setConnection();
        updateTable();
    }

    private  void setConnection(){
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Connected database successfully...");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private void updateTable(){
        String sql = "SELECT * FROM tabKnows WHERE status is null LIMIT 100000";
        ResultSet rs = null;
        try {
            System.out.println("Creating statement...");
            stmt = conn.createStatement();

            boolean tableEnded = false;
            while(!tableEnded) {
                System.out.println("Executing statement...");
                rs = stmt.executeQuery(sql);

                //STEP 5: Extract data from result set
                while (rs.next()) {
                    updateRow(rs);

                }

                tableEnded=true;
                rs.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }


    private void updateRow(ResultSet rs) {
        try {
            counter++;
            URL url = new URL(rs.getString("url"));
            long id = rs.getLong("id");

            if ( id%10 == modulo_number ) {

                String text = ArticleExtractor.INSTANCE.getText(url);

                System.out.println("=================");
                System.out.println("ID: " + id);
                System.out.println("URL: " + url);
                System.out.println("TEXT " + text);

                String sql = "UPDATE trc.tabKnows SET text = ?, status = ?  WHERE id = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);

                if (text != null && !text.equals("")) {
                    stmt.setString(1, text);
                    stmt.setString(2, "SCRAPED");
                    passCounter++;
                } else {
                    stmt.setString(1, "");
                    stmt.setString(2, "FAILED");
                }
                stmt.setLong(3, id);
                System.out.println("------>" + stmt.toString());
                stmt.executeUpdate();

            }
        } catch (BoilerpipeProcessingException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {
        new Thread(new VideosTableUpdater(9)).start();
        new Thread(new VideosTableUpdater(8)).start();
        new Thread(new VideosTableUpdater(7)).start();
        new Thread(new VideosTableUpdater(6)).start();
    }

}

