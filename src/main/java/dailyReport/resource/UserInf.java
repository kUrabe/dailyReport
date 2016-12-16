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
@SqlResultSetMappings({
	@SqlResultSetMapping(
			name="getUserBaseInfQuery", 
			classes = @ConstructorResult(
					targetClass = dailyReport.resource.GetUserBaseInfQuery.class, 
					columns = {
							@ColumnResult(name = "user_id"),
							@ColumnResult(name = "user_name"),
							@ColumnResult(name = "user_name_kana"),
							@ColumnResult(name = "user_sex"),
							@ColumnResult(name = "user_birthday"),
							@ColumnResult(name = "user_status"),
							@ColumnResult(name = "campany_id"),
							@ColumnResult(name = "campany_title"),
							@ColumnResult(name = "department_id"),
							@ColumnResult(name = "department_title"),
							@ColumnResult(name = "position_id"),
							@ColumnResult(name = "position_title")
					}
			)
	)
})
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
	
	// ユーザ名（カナ）
	@Column(name="user_name_kana")
	private String user_name_kana;
	
	// 性別
	@Column(name="user_sex")
	private Integer user_sex;
	
	// 誕生日
	@Column(name="user_birthday")
	private Date user_birthday;
	
	// ユーザ権限
	@Column(name="user_authority")
	private Integer user_authority;
	
	// ユーザステータス
	@Column(name="user_status")
	private Integer user_status;	
	
	// 作成日
	@Column(name="create_date")
	private Date create_date;

	// 更新日
	@Column(name="update_dated")
	private Date update_dated;
	
	// レコード情報（外部キーで紐づく）
	@OneToMany
	@JoinColumn(name="user_id", insertable=true, updatable=true)
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
	 * 名前 を設定します.
	 * 
	 * @param userName
	 *            名前
	 */
	public void setUserNameKana(String userNameKana) {
		this.user_name_kana = userNameKana;
	}

	/**
	 * 名前 を取得します.user_name_kana
	 * 
	 * @return 名前
	 */
	public String getUserNameKana() {
		return this.user_name_kana;
	}
	

	/**
	 * 性別 を設定します.
	 * 
	 * @param userSex
	 *            性別
	 */
	public void setUserSex(Integer userSex) {
		this.user_sex = userSex;
	}
	
	

	/**
	 * 性別 を取得します.
	 * 
	 * @return 性別
	 */
	public Integer getUserSex() {
		return this.user_sex;
	}
	
	/**
	 * 誕生日 を設定します.
	 * 
	 * @param createDate
	 *            作成日
	 */
	public void setUserBirthday(Date UserBirthday) {
		this.user_birthday = UserBirthday;
	}

	/**
	 * 誕生日 を取得します.
	 * 
	 * @return 作成日
	 */
	public Date getUserBirthday() {
		return this.user_birthday;
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
	 * ユーザステータス を設定します.
	 * 
	 * @param userAuthority
	 *            ユーザ権限
	 */
	public void setUserStatus(Integer UserStatus) {
		this.user_status = UserStatus;
	}

	/**
	 * ユーザステータス を取得します.
	 * 
	 * @return ユーザ権限
	 */
	public Integer getUserStatus() {
		return this.user_status;
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
