package dailyReport.resource;

import java.io.Serializable;

import javax.persistence.*;

//TODO:【未実装】複合主キーに対する対処は未
@Entity
@Table(name="record_content_detail")
public class RecordContentDetail implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** レコード情報. */
	@ManyToOne
	@JoinColumn(name="content_id", insertable=false, updatable=false)
	private RecordContentInf recordContentInf;

	/** 詳細ID. */
	@Id
	@Column(name="detail_id")
	private Integer detailId;

	/** 固定項目情報. */
	@ManyToOne
	@JoinColumn(name="fixed_item_id", insertable=false, updatable=false)
	private FixedItemInf fixedItemInf;

	/** 項目名. */
	@Column(name="index_name")
	private String indexName;

	/** 内容. */
	@Column(name="main_text")
	private String mainText;

	/**
	 * コンストラクタ.
	 */
	public RecordContentDetail() {
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
	 * 詳細ID を設定します.
	 * 
	 * @param detailId
	 *            詳細ID
	 */
	public void setDetailId(Integer detailId) {
		this.detailId = detailId;
	}

	/**
	 * 詳細ID を取得します.
	 * 
	 * @return 詳細ID
	 */
	public Integer getDetailId() {
		return this.detailId;
	}

	/**
	 * 固定項目情報 を設定します.
	 * 
	 * @param fixedItemInf
	 *            固定項目情報
	 */
	public void setFixedItemInf(FixedItemInf fixedItemInf) {
		this.fixedItemInf = fixedItemInf;
	}

	/**
	 * 固定項目情報 を取得します.
	 * 
	 * @return 固定項目情報
	 */
	public FixedItemInf getFixedItemInf() {
		return this.fixedItemInf;
	}

	/**
	 * 項目名 を設定します.
	 * 
	 * @param indexName
	 *            項目名
	 */
	public void setIndexName(String indexName) {
		this.indexName = indexName;
	}

	/**
	 * 項目名 を取得します.
	 * 
	 * @return 項目名
	 */
	public String getIndexName() {
		return this.indexName;
	}

	/**
	 * 内容 を設定します.
	 * 
	 * @param mainText
	 *            内容
	 */
	public void setMainText(String mainText) {
		this.mainText = mainText;
	}

	/**
	 * 内容 を取得します.
	 * 
	 * @return 内容
	 */
	public String getMainText() {
		return this.mainText;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((recordContentInf == null) ? 0 : recordContentInf.hashCode());
		result = prime * result + ((detailId == null) ? 0 : detailId.hashCode());
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
		RecordContentDetail other = (RecordContentDetail) obj;
		if (recordContentInf == null) {
			if (other.recordContentInf != null) {
				return false;
			}
		} else if (!recordContentInf.equals(other.recordContentInf)) {
			return false;
		}
		if (detailId == null) {
			if (other.detailId != null) {
				return false;
			}
		} else if (!detailId.equals(other.detailId)) {
			return false;
		}
		return true;
	}

}
