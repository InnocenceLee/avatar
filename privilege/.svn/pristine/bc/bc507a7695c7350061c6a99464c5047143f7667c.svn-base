package privilege;

import java.io.IOException;
import java.util.Locale;
import java.util.ResourceBundle;

public class GetPic {
	public static String GetPicFromVideo(){
		try {
		String localVideoPath = "D://test.mp4";
		String sPicPath="D://test.png";
		ResourceBundle rb = ResourceBundle.getBundle("xml", Locale.getDefault());
		String locationofffmpeg = rb.getString("videoprocess");
		String command="./../../../../"+locationofffmpeg+" -i "+localVideoPath+" -y -f image2 -ss 8 -t 0.001 -s 200x200 "
				+sPicPath;
		Runtime rt = Runtime.getRuntime();
			try {
				Process pro = rt.exec(command);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//String tmpPath = sPicPath.replaceAll(regex, replacement)
		return "";
	}
}
