package dailyReport.resource;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

// TopSearchContent Top画面検索実行時
@Entity
@NamedNativeQueries({
	@NamedNativeQuery(name="TopSearchContentQuery", 
			query="SELECT i FROM record_content_inf i LEFT JOIN FETCH record_content_add a ON i.content_id = a.content_id WHERE i.user_id like :serach_user AND i.entry_status IN(:serach_note) AND i.report_date BETWEEN :serach_from_date AND :serach_to_date AND a.category_status IN(:serach_read)")
})
@Table(name="record_content_inf")
public class RecordContentInf implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** コンテンツID. */
	@Id
	@Column(name="content_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer contentId;

	/** ユーザ情報. */
	@ManyToOne
	@JoinColumn(name="user_id", insertable=false, updatable=false)
	private UserInf userInf;

	/** 登録書式. */
	@Column(name="entry_format")
	private Integer entryFormat;

	/** 登録状態. */
	@Column(name="entry_status")
	private Integer entryStatus;

	/** 基底親コンテンツID. */
	@Column(name="base_parent_content_id")
	private Integer baseParentContentId;

	/** 祖先コンテンツID. */
	@Column(name="grand_parent_content_id")
	private Integer grandParentContentId;

	/** 親コンテンツID. */
	@Column(name="parent_content_id")
	private Integer parentContentId;

	/** 報告日. */
	@Column(name="report_date")
	private Date reportDate;

	/** 作成日. */
	@Column(name="create_date")
	private Date createDate;

	/** 更新日. */
	@Column(name="update_dated")
	private Date updateDated;

	/** コンテンツ追加情報 一覧. */
	@OneToMany
	@JoinColumn(name="content_id", insertable=false, updatable=false)
	private Set<RecordContentAdd> recordContentAddSet;

	/** コンテンツ詳細 一覧. */
	@OneToMany
	@JoinColumn(name="content_id", insertable=false, updatable=false)
	private Set<RecordContentDetail> recordContentDetailSet;

	/**
	 * コンストラクタ.
	 */
	public RecordContentInf() {
		this.recordContentAddSet = new HashSet<RecordContentAdd>();
		this.recordContentDetailSet = new HashSet<RecordContentDetail>();
	}

	/**
	 * コンテンツID を設定します.
	 * 
	 * @param contentId
	 *            コンテンツID
	 */
	public void setContentId(Integer contentId) {
		this.contentId = contentId;
	}

	/**
	 * コンテンツID を取得します.
	 * 
	 * @return コンテンツID
	 */
	public Integer getContentId() {
		return this.contentId;
	}

	/**
	 * ユーザ情報 を設定します.
	 * 
	 * @param userInf
	 *            ユーザ情報
	 */
	public void setUserInf(UserInf userInf) {
		this.userInf = userInf;
	}

	/**
	 * ユーザ情報 を取得します.
	 * 
	 * @return ユーザ情報
	 */
	public UserInf getUserInf() {
		return this.userInf;
	}

	/**
	 * 登録書式 を設定します.
	 * 
	 * @param entryFormat
	 *            登録書式
	 */
	public void setEntryFormat(Integer entryFormat) {
		this.entryFormat = entryFormat;
	}

	/**
	 * 登録書式 を取得します.
	 * 
	 * @return 登録書式
	 */
	public Integer getEntryFormat() {
		return this.entryFormat;
	}

	/**
	 * 登録状態 を設定します.
	 * 
	 * @param entryStatus
	 *            登録状態
	 */
	public void setEntryStatus(Integer entryStatus) {
		this.entryStatus = entryStatus;
	}

	/**
	 * 登録状態 を取得します.
	 * 
	 * @return 登録状態
	 */
	public Integer getEntryStatus() {
		return this.entryStatus;
	}

	/**
	 * 基底親コンテンツID を設定します.
	 * 
	 * @param baseParentContentId
	 *            基底親コンテンツID
	 */
	public void setBaseParentContentId(Integer baseParentContentId) {
		this.baseParentContentId = baseParentContentId;
	}

	/**
	 * 基底親コンテンツID を取得します.
	 * 
	 * @return 基底親コンテンツID
	 */
	public Integer getBaseParentContentId() {
		return this.baseParentContentId;
	}

	/**
	 * 祖先コンテンツID を設定します.
	 * 
	 * @param grandParentContentId
	 *            祖先コンテンツID
	 */
	public void setGrandParentContentId(Integer grandParentContentId) {
		this.grandParentContentId = grandParentContentId;
	}

	/**
	 * 祖先コンテンツID を取得します.
	 * 
	 * @return 祖先コンテンツID
	 */
	public Integer getGrandParentContentId() {
		return this.grandParentContentId;
	}

	/**
	 * 親コンテンツID を設定します.
	 * 
	 * @param parentContentId
	 *            親コンテンツID
	 */
	public void setParentContentId(Integer parentContentId) {
		this.parentContentId = parentContentId;
	}

	/**
	 * 親コンテンツID を取得します.
	 * 
	 * @return 親コンテンツID
	 */
	public Integer getParentContentId() {
		return this.parentContentId;
	}

	/**
	 * 報告日 を設定します.
	 * 
	 * @param reportDate
	 *            報告日
	 */
	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
	}

	/**
	 * 報告日 を取得します.
	 * 
	 * @return 報告日
	 */
	public Date getReportDate() {
		return this.reportDate;
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
	 * コンテンツ追加情報 一覧を設定します.
	 * 
	 * @param recordContentAddSet
	 *            コンテンツ追加情報 一覧
	 */
	public void setRecordContentAddSet(Set<RecordContentAdd> recordContentAddSet) {
		this.recordContentAddSet = recordContentAddSet;
	}

	/**
	 * コンテンツ追加情報 を追加します.
	 * 
	 * @param recordContentAdd
	 *            コンテンツ追加情報
	 */
	public void addRecordContentAdd(RecordContentAdd recordContentAdd) {
		this.recordContentAddSet.add(recordContentAdd);
	}

	/**
	 * コンテンツ追加情報 一覧を取得します.
	 * 
	 * @return コンテンツ追加情報 一覧
	 */
	public Set<RecordContentAdd> getRecordContentAddSet() {
		return this.recordContentAddSet;
	}

	/**
	 * コンテンツ詳細 一覧を設定します.
	 * 
	 * @param recordContentDetailSet
	 *            コンテンツ詳細 一覧
	 */
	public void setRecordContentDetailSet(Set<RecordContentDetail> recordContentDetailSet) {
		this.recordContentDetailSet = recordContentDetailSet;
	}

	/**
	 * コンテンツ詳細 を追加します.
	 * 
	 * @param recordContentDetail
	 *            コンテンツ詳細
	 */
	public void addRecordContentDetail(RecordContentDetail recordContentDetail) {
		this.recordContentDetailSet.add(recordContentDetail);
	}

	/**
	 * コンテンツ詳細 一覧を取得します.
	 * 
	 * @return コンテンツ詳細 一覧
	 */
	public Set<RecordContentDetail> getRecordContentDetailSet() {
		return this.recordContentDetailSet;
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((contentId == null) ? 0 : contentId.hashCode());
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
		RecordContentInf other = (RecordContentInf) obj;
		if (contentId == null) {
			if (other.contentId != null) {
				return false;
			}
		} else if (!contentId.equals(other.contentId)) {
			return false;
		}
		return true;
	}


}
