package entity;

/**
 * ͳһ�µ��ύΪ΢�ŵĲ���
 * @author iYjrg_xiebin
 * @date 2015��11��26������10:17:06
 */
public class Unifiedorder {
	
	private String appid;//΢�ŷ���Ĺ����˺�ID����ҵ��corpid��Ϊ��appId��,���磺wxd678efh567hg6787
	private String mch_id;//�̻�id
	private String device_info;//�ն��豸��(�ŵ�Ż������豸ID)��ע�⣺PC��ҳ���ں���֧���봫"WEB"
	private String nonce_str;//����ַ���:����+��д��ĸ����ϣ�32λ
	private String sign;//ǩ��
	private String body;//��Ʒ��֧������Ҫ����
	private String detail;//��Ʒ������ϸ�б�
	private String attach;//���Ӳ���
	private String out_trade_no;//�̻�ϵͳ�ڲ��Ķ�����
	private String fee_type;//��������:����ISO 4217��׼����λ��ĸ���룬Ĭ������ң�CNY
	private int total_fee;//�ܽ��
	private String spbill_create_ip;//APP����ҳ֧���ύ[�û���ip]��Native֧�������΢��֧��API�Ļ���IP��
	private String time_start;//��������ʱ�䣬��ʽΪyyyyMMddHHmmss����2009��12��25��9��10��10���ʾΪ20091225091010
	private String time_expire;//����ʧЧʱ�䣬��ʽΪyyyyMMddHHmmss����2009��12��27��9��10��10���ʾΪ20091227091010;���ʧЧʱ�����������5����[֧������30���ӣ�ͬ��30����]
	private String goods_tag;//��Ʒ��ǣ�����ȯ�������Żݹ��ܵĲ���
	private String notify_url;//����΢��֧���첽֪ͨ�ص���ַ
	private String trade_type;//��������:JSAPI��NATIVE��APP
	private String product_id;//trade_type=NATIVE���˲����ش�����idΪ��ά���а�������ƷID���̻����ж��塣
	private String limit_pay;//no_credit--ָ������ʹ�����ÿ�֧��
	private String openid;//trade_type=JSAPI���˲����ش����û����̻�appid�µ�Ψһ��ʶ
	
	public String getAppid() {
		return appid;
	}
	public String getMch_id() {
		return mch_id;
	}
	public String getDevice_info() {
		return device_info;
	}
	public String getNonce_str() {
		return nonce_str;
	}
	public String getSign() {
		return sign;
	}
	public String getBody() {
		return body;
	}
	public String getDetail() {
		return detail;
	}
	public String getAttach() {
		return attach;
	}
	public String getOut_trade_no() {
		return out_trade_no;
	}
	public String getFee_type() {
		return fee_type;
	}
	public int getTotal_fee() {
		return total_fee;
	}
	public String getSpbill_create_ip() {
		return spbill_create_ip;
	}
	public String getTime_start() {
		return time_start;
	}
	public String getTime_expire() {
		return time_expire;
	}
	public String getGoods_tag() {
		return goods_tag;
	}
	public String getNotify_url() {
		return notify_url;
	}
	public String getTrade_type() {
		return trade_type;
	}
	public String getProduct_id() {
		return product_id;
	}
	public String getLimit_pay() {
		return limit_pay;
	}
	public String getOpenid() {
		return openid;
	}
	public void setAppid(String appid) {
		this.appid = appid;
	}
	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}
	public void setDevice_info(String device_info) {
		this.device_info = device_info;
	}
	public void setNonce_str(String nonce_str) {
		this.nonce_str = nonce_str;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public void setAttach(String attach) {
		this.attach = attach;
	}
	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}
	public void setFee_type(String fee_type) {
		this.fee_type = fee_type;
	}
	public void setTotal_fee(int total_fee) {
		this.total_fee = total_fee;
	}
	public void setSpbill_create_ip(String spbill_create_ip) {
		this.spbill_create_ip = spbill_create_ip;
	}
	public void setTime_start(String time_start) {
		this.time_start = time_start;
	}
	public void setTime_expire(String time_expire) {
		this.time_expire = time_expire;
	}
	public void setGoods_tag(String goods_tag) {
		this.goods_tag = goods_tag;
	}
	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}
	public void setTrade_type(String trade_type) {
		this.trade_type = trade_type;
	}
	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}
	public void setLimit_pay(String limit_pay) {
		this.limit_pay = limit_pay;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	

}
