package com.web.lytreport.service.internal;

import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;

import com.alibaba.excel.EasyExcel;
import com.utils.EasyExcelUtils;
import com.utils.ExcelExport;

public class ReportPrcUtils {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	/**
	 * 获取工单列表 2021-01-07
	 */
	public List getTaskNoPrc(String company, String factory, String keyword) throws Exception {
		List resultList = (List) jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con) throws SQLException {
				String storedProc = "{call  PRC_APP_GETTASKNO(?,?,?,?,?,?)}";// 调用的sql
				CallableStatement cs = con.prepareCall(storedProc);
				cs.setString(1, factory);
				cs.setString(2, company);
				cs.setString(3, keyword);
				cs.registerOutParameter(4, java.sql.Types.INTEGER);// 输出参数 返回标识
				cs.registerOutParameter(5, java.sql.Types.VARCHAR);// 输出参数 返回标识
				cs.registerOutParameter(6, -10);// 输出参数 追溯数据
				return cs;
			}
		}, new CallableStatementCallback() {
			public Object doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				List<Object> result = new ArrayList<>();
				List<Map<String, Object>> l = new ArrayList();
				cs.execute();
				result.add(cs.getInt(4));
				result.add(cs.getString(5));
				if (cs.getString(4).toString().equals("0")) {
					// 游标处理
					ResultSet rs = (ResultSet) cs.getObject(6);
					try {
						l = fitMap(rs);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					result.add(l);
				}
				System.out.println(l);
				return result;
			}
		});
		return resultList;
	}

	/**
	 * 获取结果报表 2021-01-07
	 */
	public List getReportPrc(String prc_name, String company, String factory, String taskNo, String batNo,
			String begTime, String endTime, Integer size, Integer page) throws Exception {
		List resultList = (List) jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con) throws SQLException {
				String storedProc = "{call " + prc_name + " (?,?,?,?,?,?,?,?,?,?,?,?)}";// 调用的sql
				CallableStatement cs = con.prepareCall(storedProc);
				cs.setString(1, factory);
				cs.setString(2, company);
				cs.setString(3, taskNo);
				cs.setString(4, batNo);
				cs.setString(5, begTime);
				cs.setString(6, endTime);
				cs.setInt(7, size);
				cs.setInt(8, page + 1);
				cs.registerOutParameter(9, java.sql.Types.INTEGER);// 输出参数 返回标识-总记录数
				cs.registerOutParameter(10, java.sql.Types.INTEGER);// 输出参数 返回标识-标识
				cs.registerOutParameter(11, java.sql.Types.VARCHAR);// 输出参数 返回标识
				cs.registerOutParameter(12, -10);// 输出参数 追溯数据
				return cs;
			}
		}, new CallableStatementCallback() {
			public Object doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				List<Object> result = new ArrayList<>();
				List<Map<String, Object>> l = new ArrayList();
				List<Object> cols = new ArrayList();
				cs.execute();
				result.add(cs.getInt(10));
				result.add(cs.getString(11));
				if (cs.getString(10).toString().equals("0")) {
					result.add(cs.getInt(9));
					// 游标处理
					ResultSet rs = (ResultSet) cs.getObject(12);
					try {
						l = fitMap(rs);
						cols = fitMapCols(rs);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					result.add(l);
					result.add(cols);
				}
				System.out.println(l);
				return result;
			}
		});
		return resultList;
	}

	/**
	 * 质量IQC来料检验台账 2020-01-22
	 **/
	public List getQualCheckReportPrc(String prc_name, String company, String factory, String year, String month,
			String target, Integer dataType, String usrName) throws Exception {
		List resultList = (List) jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con) throws SQLException {
				String storedProc = "{call " + prc_name + " (?,?,?,?,?,?,?,?,?,?)}";// 调用的sql
				CallableStatement cs = con.prepareCall(storedProc);
				cs.setString(1, factory);
				cs.setString(2, company);
				cs.setString(3, year);
				cs.setString(4, month);
				cs.setString(5, target);
				cs.setInt(6, dataType);
				cs.setString(7, usrName);
				cs.registerOutParameter(8, java.sql.Types.INTEGER);// 输出参数
																	// 返回标识-标识
				cs.registerOutParameter(9, java.sql.Types.VARCHAR);// 输出参数 返回标识
				cs.registerOutParameter(10, -10);// 输出参数 追溯数据
				return cs;
			}
		}, new CallableStatementCallback() {
			public Object doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				List<Object> result = new ArrayList<>();
				List<Map<String, Object>> l = new ArrayList();
				cs.execute();
				result.add(cs.getInt(8));
				result.add(cs.getString(9));
				if (cs.getString(8).toString().equals("0")) {
					// 游标处理
					ResultSet rs = (ResultSet) cs.getObject(10);
					try {
						if (dataType == 1) {
							l = fitMapIQCX(rs);
						} else {
							l = fitMap(rs);
						}
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					result.add(l);

				}
				System.out.println(l);
				return result;
			}
		});
		return resultList;
	}

	/**
	 * 2021-01-25 质量IQC来料检验台账 处理图表x轴键值-lst
	 **/
	private List<Map<String, Object>> fitMapIQCX(ResultSet rs) throws Exception {
		List<Map<String, Object>> list = new ArrayList<>();// 存所有数据
		List<Map<String, Object>> list_t = new ArrayList<>();// 存临时数据
		if (null != rs) {
			Map<String, Object> map_c = new HashMap<String, Object>();// 存echarts所需数据
			List<Object> list_c;// 存无键值的数据
			Map<String, Object> map;// 存有键值的数据
			int colNum = rs.getMetaData().getColumnCount();
			List<String> columnNames = new ArrayList<String>();
			List<String> columnNames1 = new ArrayList<String>();
			for (int i = 1; i <= colNum; i++) {
				columnNames.add(rs.getMetaData().getColumnName(i));
				String aString = rs.getMetaData().getColumnName(i);
				columnNames1.add(aString.substring(1, aString.length()));
			}
			map_c.put("columnNames", columnNames1);// 保存表头-作为横坐标
			int i = 0;// 循环次数，用于设置键值
			while (rs.next()) {
				map = new HashMap<String, Object>();
				list_c = new ArrayList<>();
				for (String columnName : columnNames) {
					map.put(columnName, rs.getString(columnName));
					String tString = rs.getString(columnName);
					if (tString.indexOf("%") != -1) {// 含有%字符时
						list_c.add(tString.substring(0, tString.indexOf("%")));// 去掉%
					} else {
						list_c.add(tString);
					}
				}
				map_c.put("index" + i, list_c);
				i++;
				list_t.add(map);
			}
			map = new HashMap<String, Object>();
			map.put("ordData", list_t);
			list.add(map);
			list.add(map_c);
		}
		return list;
	}

	/**
	 * 2021-01-28 生产日报-按工单
	 **/
	public List getProdDailyByTaskReportPrc(String prc_name, String proc, String begTime, String endTime,
			Integer dataType) throws Exception {
		List resultList = (List) jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con) throws SQLException {
				String storedProc = "{call " + prc_name + " (?,?,?,?,?,?,?)}";// 调用的sql
				CallableStatement cs = con.prepareCall(storedProc);
				cs.setString(1, proc);
				cs.setString(2, begTime);
				cs.setString(3, endTime);
				cs.setInt(4, dataType);
				cs.registerOutParameter(5, java.sql.Types.INTEGER);// 输出参数
																	// 返回标识-标识
				cs.registerOutParameter(6, java.sql.Types.VARCHAR);// 输出参数 返回标识
				cs.registerOutParameter(7, -10);// 输出参数 追溯数据
				return cs;
			}
		}, new CallableStatementCallback() {
			public Object doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				List<Object> result = new ArrayList<>();
				List<Map<String, Object>> l = new ArrayList();
				cs.execute();
				result.add(cs.getInt(5));
				result.add(cs.getString(6));
				if (cs.getString(5).toString().equals("0")) {
					// 游标处理
					ResultSet rs = (ResultSet) cs.getObject(7);
					try {
						l = fitMap(rs);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					result.add(l);
				}
				System.out.println(l);
				return result;
			}
		});
		return resultList;
	}

	/**
	 * 2021-01-29 lst 只返回列名
	 **/
	private List<Object> fitMapCols(ResultSet rs) throws Exception {
		List<Object> list = new ArrayList<>();
		if (null != rs) {
			int colNum = rs.getMetaData().getColumnCount();
			List<Object> columnNames = new ArrayList<Object>();
			for (int i = 1; i <= colNum; i++) {
				columnNames.add(rs.getMetaData().getColumnName(i));
			}
			list = columnNames;
		}
		return list;
	}

	/**
	 * 2021-01-29 数据导出【导出大量数据会卡死】 param: response, obj-存储过程结果 cols-表头列
	 **/
	public void Export1(HttpServletResponse response, Object obj, Object cols) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		XSSFWorkbook workbook = new XSSFWorkbook();
		// String filePath = "static/excelFile/导出数据.xlsx";
		String filePath = "导出数据.xlsx";
		// List<Object> objList=(List<Object>) obj;//结果集

		String cString = cols.toString();
		cString = cString.substring(1, cString.length() - 1);// 头尾去掉'['&']'
		String[] map_arr = cString.split(", ");// 列名数据处理

		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();// 最终数据
		listMap = (List<Map<String, Object>>) obj;

		ExcelExport.export(response, listMap, workbook, map_arr, filePath, "导出数据.xlsx");
	}

	/**
	 * 2021-01-30 数据导出 easyexcel
	 * lst
	 * param: response, obj-存储过程结果 cols-表头列
	 **/
	@GetMapping("download")
	public void Export3(HttpServletResponse response, Object obj, Object cols) throws Exception {
		// 处理表头数组
		String cString = cols.toString();
		cString = cString.substring(1, cString.length() - 1);// 头尾去掉'['&']'
		String[] tit_arr = cString.split(", ");// 列名数据处理
		// 查询出的数据
		List<Map<String, Object>> list = (List<Map<String, Object>>) obj;
		EasyExcelUtils.download(response, "导出数据", tit_arr, tit_arr, list);
	}

	private List<Map<String, Object>> fitMap(ResultSet rs) throws Exception {
		List<Map<String, Object>> list = new ArrayList<>();
		if (null != rs) {
			Map<String, Object> map;
			int colNum = rs.getMetaData().getColumnCount();
			List<String> columnNames = new ArrayList<String>();
			for (int i = 1; i <= colNum; i++) {
				columnNames.add(rs.getMetaData().getColumnName(i));
			}
			while (rs.next()) {
				map = new HashMap<String, Object>();
				for (String columnName : columnNames) {
					map.put(columnName, rs.getString(columnName));
				}
				list.add(map);
			}
		}
		return list;
	}
}
