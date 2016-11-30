package dailyReport.resource;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;


@Entity
@Table(name="fixed_item_inf")
public class FixedItemInf implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** 固定項目ID. */
	@Id
	@Column(name="fixed_item_id")
	private Integer fixed_item_id;

	/** 項目状態. */
	@Column(name="item_status")
	private Integer item_status;

	/** 出力順序. */
	@Column(name="output_order")
	private Integer output_order;

	/** 見出し名. */
	@Column(name="index_name")
	private String index_name;

	/** ボタン機能. */
	@Column(name="button_function")
	private Integer button_function;

	/** ボタン名. */
	@Column(name="button_name")
	private String button_name;

	/** 取得ボタン名. */
	@Column(name="get_index_name")
	private String get_index_name;

	/** コンテンツ詳細 一覧. */
	@OneToMany
	@JoinColumn(name="fixed_item_id", insertable=false, updatable=false)
	private Set<RecordContentDetail> recordContentDetailSet;

	/**
	 * コンストラクタ.
	 */
	public FixedItemInf() {
		this.recordContentDetailSet = new HashSet<RecordContentDetail>();
	}

	/**
	 * 固定項目ID を設定します.
	 * 
	 * @param fixedItemId
	 *            固定項目ID
	 */
	public void setFixedItemId(Integer fixedItemId) {
		this.fixed_item_id = fixedItemId;
	}

	/**
	 * 固定項目ID を取得します.
	 * 
	 * @return 固定項目ID
	 */
	public Integer getFixedItemId() {
		return this.fixed_item_id;
	}

	/**
	 * 項目状態 を設定します.
	 * 
	 * @param itemStatus
	 *            項目状態
	 */
	public void setItemStatus(Integer itemStatus) {
		this.item_status = itemStatus;
	}

	/**
	 * 項目状態 を取得します.
	 * 
	 * @return 項目状態
	 */
	public Integer getItemStatus() {
		return this.item_status;
	}

	/**
	 * 出力順序 を設定します.
	 * 
	 * @param outputOrder
	 *            出力順序
	 */
	public void setOutputOrder(Integer outputOrder) {
		this.output_order = outputOrder;
	}

	/**
	 * 出力順序 を取得します.
	 * 
	 * @return 出力順序
	 */
	public Integer getOutputOrder() {
		return this.output_order;
	}

	/**
	 * 見出し名 を設定します.
	 * 
	 * @param indexName
	 *            見出し名
	 */
	public void setIndexName(String indexName) {
		this.index_name = indexName;
	}

	/**
	 * 見出し名 を取得します.
	 * 
	 * @return 見出し名
	 */
	public String getIndexName() {
		return this.index_name;
	}

	/**
	 * ボタン機能 を設定します.
	 * 
	 * @param buttonFunction
	 *            ボタン機能
	 */
	public void setButtonFunction(Integer buttonFunction) {
		this.button_function = buttonFunction;
	}

	/**
	 * ボタン機能 を取得します.
	 * 
	 * @return ボタン機能
	 */
	public Integer getButtonFunction() {
		return this.button_function;
	}

	/**
	 * ボタン名 を設定します.
	 * 
	 * @param buttonName
	 *            ボタン名
	 */
	public void setButtonName(String buttonName) {
		this.button_name = buttonName;
	}

	/**
	 * ボタン名 を取得します.
	 * 
	 * @return ボタン名
	 */
	public String getButtonName() {
		return this.button_name;
	}

	/**
	 * 取得ボタン名 を設定します.
	 * 
	 * @param getIndexName
	 *            取得ボタン名
	 */
	public void setGetIndexName(String getIndexName) {
		this.get_index_name = getIndexName;
	}

	/**
	 * 取得ボタン名 を取得します.
	 * 
	 * @return 取得ボタン名
	 */
	public String getGetIndexName() {
		return this.get_index_name;
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
		result = prime * result + ((fixed_item_id == null) ? 0 : fixed_item_id.hashCode());
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
		FixedItemInf other = (FixedItemInf) obj;
		if (fixed_item_id == null) {
			if (other.fixed_item_id != null) {
				return false;
			}
		} else if (!fixed_item_id.equals(other.fixed_item_id)) {
			return false;
		}
		return true;
	}

}

