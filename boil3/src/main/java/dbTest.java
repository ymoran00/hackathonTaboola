import java.sql.*;
import de.l3s.boilerpipe.BoilerpipeProcessingException;
import de.l3s.boilerpipe.extractors.ArticleExtractor;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by dotan.b on 1/11/17.
 */
public class dbTest {

        // JDBC driver name and database URL
        static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
        static final String DB_URL = "jdbc:mysql://qa_ads-01_db.service.qa-consul.taboolasyndication.com:3306/trc";

        //  Database credentials
        static final String USER = "trc";
        static final String PASS = "taboola";

        public static void main(String[] args) {
            Connection conn = null;
            Statement stmt = null;

            try {
                //STEP 2: Register JDBC driver
                Class.forName("com.mysql.jdbc.Driver");

                //STEP 3: Open a connection
                System.out.println("Connecting to a selected database...");
                conn = DriverManager.getConnection(DB_URL, USER, PASS);
                System.out.println("Connected database successfully...");

                //STEP 4: Execute a query
                System.out.println("Creating statement...");
                stmt = conn.createStatement();

                String sql = "SELECT id, url, pub_id FROM videos limit 10";

                ResultSet rs = stmt.executeQuery(sql);
                //STEP 5: Extract data from result set
                while (rs.next()) {
                    //Retrieve by column name
                    String text = null;
                    long id = rs.getLong("id");
                    URL url = new URL(rs.getString("url"));
                   // String articleText = null;

                    try {
                        text = ArticleExtractor.INSTANCE.getText(url);
                        System.out.println("============================================================");
                        System.out.println("ID: " + id);
                        System.out.println("Url: " + url);
                        System.out.println("text: " + text);

                    } catch (BoilerpipeProcessingException e) {
                        e.printStackTrace();
                    }

                    //Display values






                }
                rs.close();
            } catch (SQLException se) {
                //Handle errors for JDBC
                se.printStackTrace();
            } catch (Exception e) {
                //Handle errors for Class.forName
                e.printStackTrace();
            } finally {
                //finally block used to close resources
                try {
                    if (stmt != null)
                        conn.close();
                } catch (SQLException se) {
                }// do nothing
                try {
                    if (conn != null)
                        conn.close();
                } catch (SQLException se) {
                    se.printStackTrace();
                }//end finally try
            }//end try
            System.out.println("Goodbye!");
        }//end main
    }//end JDBCExample

