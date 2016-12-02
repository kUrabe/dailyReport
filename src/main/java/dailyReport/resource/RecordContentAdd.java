package dailyReport.resource;

import java.io.Serializable;

import javax.persistence.*;

//TODO:【未実装】複合主キーに対する対処は未
@Entity
@NamedQueries({
	@NamedQuery(
			name="addContentSave",
			//query="UPDATE RecordContentAdd a SET a.user_id = :user_id, a.add_category = :add_category, a.category_status = :category_status WHERE a.recoredContentInf.content_id = :content_id AND a.user_id = :user_id AND a.add_category = :add_category")
			//query="UPDATE RecordContentInf i LEFT JOIN FETCH i.recordContentAddSet a SET a.user_id = :user_id, a.add_category = :add_category, a.category_status = :category_status WHERE a.content_id = :content_id AND a.user_id = :user_id AND a.add_category = :add_category")
			query="SELECT a FROM RecordContentInf i LEFT JOIN i.recordContentAddSet a WHERE a.user_id = :user_id AND i.content_id = :content_id AND a.add_category = :add_category")
})
@Table(name="record_content_add")
public class RecordContentAdd implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	// 主キー
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	/** レコード情報. */
	@ManyToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name="content_id", insertable=true, updatable=false)
	private RecordContentInf recoredContentInf;

	/** ユーザID. */
	@Column(name="user_id")
	private String user_id;

	/** 追加種別. */
	@Column(name="add_category")
	private Integer add_category;

	/** 登録状態. */
	@Column(name="category_status")
	private Integer category_status;

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
		this.recoredContentInf = recordContentInf;
	}

	/**
	 * レコード情報 を取得します.
	 * 
	 * @return レコード情報
	 */
	public RecordContentInf getRecordContentInf() {
		return this.recoredContentInf;
	}

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
	 * 追加種別 を設定します.
	 * 
	 * @param addCategory
	 *            追加種別
	 */
	public void setAddCategory(Integer addCategory) {
		this.add_category = addCategory;
	}

	/**
	 * 追加種別 を取得します.
	 * 
	 * @return 追加種別
	 */
	public Integer getAddCategory() {
		return this.add_category;
	}

	/**
	 * 登録状態 を設定します.
	 * 
	 * @param categoryStatus
	 *            登録状態
	 */
	public void setCategoryStatus(Integer categoryStatus) {
		this.category_status = categoryStatus;
	}

	/**
	 * 登録状態 を取得します.
	 * 
	 * @return 登録状態
	 */
	public Integer getCategoryStatus() {
		return this.category_status;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		return true;
	}

}
