package dailyReport.resource;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;


/**
 * クラス名：	UserInf
 * 概要：		user_infテーブルのentityクラスです。
 * 作成日：	2016/11/25
 * 作成者：	k.urabe
 */
@Entity
@Table(name="user_inf")
public class UserInf implements Serializable {
	
	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	// 主キーのユーザID
	@Id
	@Column(name="user_id")
	private String user_id;
	
	// ログインパスワード
	@Column(name="login_password")
	private String login_password;
	
	// ユーザ名（漢字）
	@Column(name="user_name")
	private String user_name;
	
	// 性別
	@Column(name="user_sex")
	private Byte user_sex;
	
	// ユーザ権限
	@Column(name="user_authority")
	private Integer user_authority;

	// 電話番号
	@Column(name="user_tel")
	private String user_tel;
	
	// メールアドレス
	@Column(name="user_mail")
	private String user_mail;;
	
	// 作成日
	@Column(name="create_date")
	private Date create_date;

	// 更新日
	@Column(name="update_dated")
	private Date update_dated;
	
	// レコード情報（外部キーで紐づく）
	@OneToMany
	@JoinColumn(name="user_id", insertable=false, updatable=false)
	private Set<RecordContentInf> recordContentInfSet;
	
	/**
	 * ユーザID を設定します.
	 * 
	 * @param userId
	 *            ユーザID
	 */
	public void setUserId(String userId) {
		this.user_id = userId;
	}

	/**
	 * ユーザID を取得します.
	 * 
	 * @return ユーザID
	 */
	public String getUserId() {
		return this.user_id;
	}

	/**
	 * パスワード を設定します.
	 * 
	 * @param loginPassword
	 *            パスワード
	 */
	public void setLoginPassword(String loginPassword) {
		this.login_password = loginPassword;
	}

	/**
	 * パスワード を取得します.
	 * 
	 * @return パスワード
	 */
	public String getLoginPassword() {
		return this.login_password;
	}

	/**
	 * 名前 を設定します.
	 * 
	 * @param userName
	 *            名前
	 */
	public void setUserName(String userName) {
		this.user_name = userName;
	}

	/**
	 * 名前 を取得します.
	 * 
	 * @return 名前
	 */
	public String getUserName() {
		return this.user_name;
	}

	/**
	 * 性別 を設定します.
	 * 
	 * @param userSex
	 *            性別
	 */
	public void setUserSex(Byte userSex) {
		this.user_sex = userSex;
	}

	/**
	 * 性別 を取得します.
	 * 
	 * @return 性別
	 */
	public Byte getUserSex() {
		return this.user_sex;
	}

	/**
	 * ユーザ権限 を設定します.
	 * 
	 * @param userAuthority
	 *            ユーザ権限
	 */
	public void setUserAuthority(Integer userAuthority) {
		this.user_authority = userAuthority;
	}

	/**
	 * ユーザ権限 を取得します.
	 * 
	 * @return ユーザ権限
	 */
	public Integer getUserAuthority() {
		return this.user_authority;
	}

	/**
	 * 電話番号 を設定します.
	 * 
	 * @param userTel
	 *            電話番号
	 */
	public void setUserTel(String userTel) {
		this.user_tel = userTel;
	}

	/**
	 * 電話番号 を取得します.
	 * 
	 * @return 電話番号
	 */
	public String getUserTel() {
		return this.user_tel;
	}

	/**
	 * メールアドレス を設定します.
	 * 
	 * @param userMail
	 *            メールアドレス
	 */
	public void setUserMail(String userMail) {
		this.user_mail = userMail;
	}

	/**
	 * メールアドレス を取得します.
	 * 
	 * @return メールアドレス
	 */
	public String getUserMail() {
		return this.user_mail;
	}

	/**
	 * 作成日 を設定します.
	 * 
	 * @param createDate
	 *            作成日
	 */
	public void setCreateDate(Date createDate) {
		this.create_date = createDate;
	}

	/**
	 * 作成日 を取得します.
	 * 
	 * @return 作成日
	 */
	public Date getCreateDate() {
		return this.create_date;
	}

	/**
	 * 更新日 を設定します.
	 * 
	 * @param updateDated
	 *            更新日
	 */
	public void setUpdateDated(Date updateDated) {
		this.update_dated = updateDated;
	}

	/**
	 * 更新日 を取得します.
	 * 
	 * @return 更新日
	 */
	public Date getUpdateDated() {
		return this.update_dated;
	}
	
	/**
	 * レコード情報 一覧を設定します.
	 * 
	 * @param recordContentInfSet
	 *            レコード情報 一覧
	 */
	public void setRecordContentInfSet(Set<RecordContentInf> recordContentInfSet) {
		this.recordContentInfSet = recordContentInfSet;
	}

	/**
	 * レコード情報 を追加します.
	 * 
	 * @param recordContentInf
	 *            レコード情報
	 */
	public void addRecordContentInf(RecordContentInf recordContentInf) {
		this.recordContentInfSet.add(recordContentInf);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((user_id == null) ? 0 : user_id.hashCode());
		return result;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		UserInf other = (UserInf) obj;
		if (user_id == null) {
			if (other.user_id != null) {
				return false;
			}
		} else if (!user_id.equals(other.user_id)) {
			return false;
		}
		return true;
	}
	
	
}
