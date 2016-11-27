package dailyReport.resource;

import java.io.Serializable;

import javax.persistence.*;

//TODO:【未実装】複合主キーに対する対処は未
@Entity
@Table(name="record_content_add")
public class RecordContentAdd implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** レコード情報. */
	@ManyToOne
	@JoinColumn(name="content_id", insertable=false, updatable=false)
	private RecordContentInf recordContentInf;

	/** ユーザID. */
	@Column(name="user_id")
	private String userId;

	/** 追加種別. */
	@Id
	@Column(name="add_category")
	private Integer addCategory;

	/** 登録状態. */
	@Column(name="category_status")
	private Integer categoryStatus;

	/**
	 * コンストラクタ.
	 */
	public RecordContentAdd() {
	}

	/**
	 * レコード情報 を設定します.
	 * 
	 * @param recordContentInf
	 *            レコード情報
	 */
	public void setRecordContentInf(RecordContentInf recordContentInf) {
		this.recordContentInf = recordContentInf;
	}

	/**
	 * レコード情報 を取得します.
	 * 
	 * @return レコード情報
	 */
	public RecordContentInf getRecordContentInf() {
		return this.recordContentInf;
	}

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
	 * 追加種別 を設定します.
	 * 
	 * @param addCategory
	 *            追加種別
	 */
	public void setAddCategory(Integer addCategory) {
		this.addCategory = addCategory;
	}

	/**
	 * 追加種別 を取得します.
	 * 
	 * @return 追加種別
	 */
	public Integer getAddCategory() {
		return this.addCategory;
	}

	/**
	 * 登録状態 を設定します.
	 * 
	 * @param categoryStatus
	 *            登録状態
	 */
	public void setCategoryStatus(Integer categoryStatus) {
		this.categoryStatus = categoryStatus;
	}

	/**
	 * 登録状態 を取得します.
	 * 
	 * @return 登録状態
	 */
	public Integer getCategoryStatus() {
		return this.categoryStatus;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((recordContentInf == null) ? 0 : recordContentInf.hashCode());
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		result = prime * result + ((addCategory == null) ? 0 : addCategory.hashCode());
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
		RecordContentAdd other = (RecordContentAdd) obj;
		if (recordContentInf == null) {
			if (other.recordContentInf != null) {
				return false;
			}
		} else if (!recordContentInf.equals(other.recordContentInf)) {
			return false;
		}
		if (userId == null) {
			if (other.userId != null) {
				return false;
			}
		} else if (!userId.equals(other.userId)) {
			return false;
		}
		if (addCategory == null) {
			if (other.addCategory != null) {
				return false;
			}
		} else if (!addCategory.equals(other.addCategory)) {
			return false;
		}
		return true;
	}

}
