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
	private String userId;
	
	// ログインパスワード
	@Column(name="login_password")
	private String loginPassword;
	
	// ユーザ名（漢字）
	@Column(name="user_name")
	private String userName;
	
	// 性別
	@Column(name="user_sex")
	private Byte userSex;
	
	// ユーザ権限
	@Column(name="user_authority")
	private Integer userAuthority;

	// 電話番号
	@Column(name="user_tel")
	private String userTel;
	
	// メールアドレス
	@Column(name="user_mail")
	private String userMail;;
	
	// 作成日
	@Column(name="create_date")
	private Date createDate;

	// 更新日
	@Column(name="update_dated")
	private Date updateDated;
	
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
		this.userId = userId;
	}

	/**
	 * ユーザID を取得します.
	 * 
	 * @return ユーザID
	 */
	public String getUserId() {
		return this.userId;
	}

	/**
	 * パスワード を設定します.
	 * 
	 * @param loginPassword
	 *            パスワード
	 */
	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	/**
	 * パスワード を取得します.
	 * 
	 * @return パスワード
	 */
	public String getLoginPassword() {
		return this.loginPassword;
	}

	/**
	 * 名前 を設定します.
	 * 
	 * @param userName
	 *            名前
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * 名前 を取得します.
	 * 
	 * @return 名前
	 */
	public String getUserName() {
		return this.userName;
	}

	/**
	 * 性別 を設定します.
	 * 
	 * @param userSex
	 *            性別
	 */
	public void setUserSex(Byte userSex) {
		this.userSex = userSex;
	}

	/**
	 * 性別 を取得します.
	 * 
	 * @return 性別
	 */
	public Byte getUserSex() {
		return this.userSex;
	}

	/**
	 * ユーザ権限 を設定します.
	 * 
	 * @param userAuthority
	 *            ユーザ権限
	 */
	public void setUserAuthority(Integer userAuthority) {
		this.userAuthority = userAuthority;
	}

	/**
	 * ユーザ権限 を取得します.
	 * 
	 * @return ユーザ権限
	 */
	public Integer getUserAuthority() {
		return this.userAuthority;
	}

	/**
	 * 電話番号 を設定します.
	 * 
	 * @param userTel
	 *            電話番号
	 */
	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}

	/**
	 * 電話番号 を取得します.
	 * 
	 * @return 電話番号
	 */
	public String getUserTel() {
		return this.userTel;
	}

	/**
	 * メールアドレス を設定します.
	 * 
	 * @param userMail
	 *            メールアドレス
	 */
	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	/**
	 * メールアドレス を取得します.
	 * 
	 * @return メールアドレス
	 */
	public String getUserMail() {
		return this.userMail;
	}

	/**
	 * 作成日 を設定します.
	 * 
	 * @param createDate
	 *            作成日
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	/**
	 * 作成日 を取得します.
	 * 
	 * @return 作成日
	 */
	public Date getCreateDate() {
		return this.createDate;
	}

	/**
	 * 更新日 を設定します.
	 * 
	 * @param updateDated
	 *            更新日
	 */
	public void setUpdateDated(Date updateDated) {
		this.updateDated = updateDated;
	}

	/**
	 * 更新日 を取得します.
	 * 
	 * @return 更新日
	 */
	public Date getUpdateDated() {
		return this.updateDated;
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
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
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
		if (userId == null) {
			if (other.userId != null) {
				return false;
			}
		} else if (!userId.equals(other.userId)) {
			return false;
		}
		return true;
	}
	
	
}
