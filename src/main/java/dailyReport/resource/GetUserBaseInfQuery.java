package dailyReport.resource;

import java.util.Date;

/**
 * クラス名：	GetUserBaseInfQuery
 * 概要：		ユーザ系画面のBase情報取得
 * 作成日：	2016/12/16
 * 作成者：	k.urabe
 */
public class GetUserBaseInfQuery {

		private String user_id;

		private String user_name;

		private String user_name_kana;

		private Integer user_sex;

		private Date user_birthday;

		private Integer user_status;

		private Integer campany_id;
		
		private String campany_title;

		private Integer department_id;
		
		private String department_title;

		private Integer position_id;
		
		private String position_title;
	
	public GetUserBaseInfQuery(
			String user_id,
			String user_name,
			String user_name_kana,
			Integer user_sex,
			Date user_birthday,
			Integer user_status,
			Integer campany_id,
			String campany_title,
			Integer department_id,
			String department_title,
			Integer position_id,
			String position_title
			) {
		this.user_id = user_id;
		this.user_name = user_name == null ? "" : user_name;
		this.user_name_kana = user_name_kana == null ? "" : user_name_kana;
		this.user_sex = user_sex == null ? 0 : new Integer(user_sex);
		this.user_birthday = user_birthday;
		this.user_status = user_status == null ? 0 : new Integer(user_status);
		this.campany_id = campany_id == null ? 0 : new Integer(campany_id);
		this.campany_title = campany_title == null ? "" : campany_title;
		this.department_id = department_id == null ? 0 : new Integer(department_id);
		this.department_title = department_title == null ? "" : department_title;
		this.position_id = position_id == null ? 0 : new Integer(position_id);
		this.position_title = position_title == null ? "" : position_title;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_name_kana() {
		return user_name_kana;
	}

	public void setUser_name_kana(String user_name_kana) {
		this.user_name_kana = user_name_kana;
	}

	public Integer getUser_sex() {
		return user_sex;
	}

	public void setUser_sex(Integer user_sex) {
		this.user_sex = user_sex;
	}

	public Date getUser_birthday() {
		return user_birthday;
	}

	public void setUser_birthday(Date user_birthday) {
		this.user_birthday = user_birthday;
	}

	public Integer getUser_status() {
		return user_status;
	}

	public void setUser_status(Integer user_status) {
		this.user_status = user_status;
	}

	public Integer getCampany_id() {
		return campany_id;
	}

	public void setCampany_id(Integer campany_id) {
		this.campany_id = campany_id;
	}

	public Integer getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}

	public Integer getPosition_id() {
		return position_id;
	}

	public void setPosition_id(Integer position_id) {
		this.position_id = position_id;
	}

	public String getCampany_title() {
		return campany_title;
	}

	public void setCampany_title(String campany_title) {
		this.campany_title = campany_title;
	}

	public String getDepartment_title() {
		return department_title;
	}

	public void setDepartment_title(String department_title) {
		this.department_title = department_title;
	}

	public String getPosition_title() {
		return position_title;
	}

	public void setPosition_title(String position_title) {
		this.position_title = position_title;
	}

	
}
