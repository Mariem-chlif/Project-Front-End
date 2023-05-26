import { Chart } from 'react-google-charts';
import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import avatar4 from 'src/assets/images/avatars/4.jpg';
import avatar5 from 'src/assets/images/avatars/5.jpg';
import './dashboard.scss';
import avatar6 from 'src/assets/images/avatars/6.jpg';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAllStats } from 'src/redux/actions/statsActions';

import { connect } from 'react-redux';
import {
	CAvatar,
	CProgress,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CCard,
	CCardHeader,
	CCardBody,
	CCardText,
	CCardTitle,
	CTableHeaderCell,
	CCol,
	CTableRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
	cibCcAmex,
	cibCcApplePay,
	cibCcMastercard,
	cibCcPaypal,
	cibCcStripe,
	cibCcVisa,
	cibGoogle,
	cibFacebook,
	cibLinkedin,
	cifBr,
	cifEs,
	cifFr,
	cifIn,
	cifPl,
	cifUs,
	cibTwitter,
	cilCloudDownload,
	cilPeople,
	cilUser,
	cilUserFemale
} from '@coreui/icons';
/* const tableExample = [
	{
		avatar: { src: avatar1, status: 'success' },
		user: {
			name: 'Yiorgos Avraamu',
			new: true,
			registered: 'Jan 1, 2021'
		},
		country: { name: 'USA', flag: cifUs },
		usage: {
			value: 50,
			period: 'Jun 11, 2021 - Jul 10, 2021',
			color: 'success'
		},
		payment: { name: 'Mastercard', icon: cibCcMastercard },
		encourage: 'weekend   '
	},
	{
		avatar: { src: avatar2, status: 'danger' },
		user: {
			name: 'Avram Tarasios',
			new: false,
			registered: 'Jan 1, 2021'
		},
		country: { name: 'Brazil', flag: cifBr },
		usage: {
			value: 22,
			period: 'Jun 11, 2021 - Jul 10, 2021',
			color: 'info'
		},
		payment: { name: 'Visa', icon: cibCcVisa },
		encourage: '5 minutes ago'
	},
	{
		avatar: { src: avatar3, status: 'warning' },
		user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
		country: { name: 'India', flag: cifIn },
		usage: {
			value: 74,
			period: 'Jun 11, 2021 - Jul 10, 2021',
			color: 'warning'
		},
		payment: { name: 'Stripe', icon: cibCcStripe },
		encourage: '1 hour ago'
	},
	{
		avatar: { src: avatar4, status: 'secondary' },
		user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
		country: { name: 'France', flag: cifFr },
		usage: {
			value: 98,
			period: 'Jun 11, 2021 - Jul 10, 2021',
			color: 'danger'
		},
		payment: { name: 'PayPal', icon: cibCcPaypal },
		encourage: 'Last month'
	},
	{
		avatar: { src: avatar5, status: 'success' },
		user: {
			name: 'Agapetus Tadeáš',
			new: true,
			registered: 'Jan 1, 2021'
		},
		country: { name: 'Spain', flag: cifEs },
		usage: {
			value: 22,
			period: 'Jun 11, 2021 - Jul 10, 2021',
			color: 'primary'
		},
		payment: { name: 'Google Wallet', icon: cibCcApplePay },
		encourage: 'Last week'
	},
	{
		avatar: { src: avatar6, status: 'danger' },
		user: {
			name: 'Friderik Dávid',
			new: true,
			registered: 'Jan 1, 2021'
		},
		country: { name: 'Poland', flag: cifPl },
		usage: {
			value: 43,
			period: 'Jun 11, 2021 - Jul 10, 2021',
			color: 'success'
		},
		payment: { name: 'Amex', icon: cibCcAmex },
		activity: 'Last week'
	}
];
export const data = [
	['Element', 'teams', { role: 'style' }],
	['pole manager', 3.94, '#b87333'], // RGB value
	['tech_lead', 10.49, 'silver'], // English color name
	['developer web ', 26.3, 'gold'],
	['developer mobile', 19.45, 'color: #e5e4e2'] // CSS-style declaration
];
export const dataWeb = [
	['Waiting', 'Hours per Day'],
	['Ready', 5],
	['Waiting', 2],
	['In progress', 7],

	['Finished', 7]
];
export const dataMobile = [
	['Waiting', 'Hours per Day'],
	['Ready', 1],
	['Waiting', 2],
	['In progress', 4],

	['Finished', 10]
];

export const optionsWeb = {
	title: 'statistics of  Web project status ',
	is3D: true
};

export const optionsMobile = {
	title: 'statistics of Mobile project status ',
	is3D: true
}; */

const superAdminDashboard = props => {
	const { getAllStats, statisticsStore } = props;
	const [LocalData, setLocalData] = useState({
		tableExample: null,
		data: null,
		dataWeb: null,
		dataMobile: null,
		optionsWeb: null,
		optionsMobile: null
	});

	useEffect(() => {
		getAllStats();
	}, []);
	useEffect(() => {
		if (statisticsStore?.allStats) {
			let tableExample = [],
				data = [],
				dataWeb = [['Waiting', 'Hours per Day']],
				dataMobile = [['Waiting', 'Hours per Day']];
			if (statisticsStore.allStats?.projectStats) {
				Object.keys(statisticsStore.allStats?.projectStats?.mobile).map(item =>
					dataMobile?.push([item, statisticsStore.allStats.projectStats.mobile[item]])
				);
				Object.keys(statisticsStore.allStats?.projectStats?.web).map(item =>
					dataWeb?.push([item, statisticsStore.allStats.projectStats.web[item]])
				);
			}
			if (statisticsStore.allStats?.userPositionsStats) {
				data = [
					['Element', 'teams', { role: 'style' }],
					['pole manager', statisticsStore.allStats?.userPositionsStats?.chef, '#b87333'],
					['tech_lead', statisticsStore.allStats?.userPositionsStats?.techLead, 'silver'],
					['developer web ', statisticsStore.allStats?.userPositionsStats?.devWeb, 'gold'],
					['developer mobile', statisticsStore.allStats?.userPositionsStats?.devMobile, 'color: #e5e4e2']
				];
			}
			if (statisticsStore.allStats?.userByScore) {
				statisticsStore.allStats?.userByScore?.map(user =>
					tableExample?.push({
						avatar: { src: user?.avatar, status: 'success' },
						user: {
							name: user?.name,
							new: true
						},

						usage: {
							value: user?.score,
							color: 'success'
						},
						encourage: 'weekend   '
					})
				);
			}

			setLocalData({
				...LocalData,
				tableExample,
				data,
				dataWeb,
				dataMobile,
				optionsWeb: {
					title: 'statistics of  Web project status ',
					is3D: true
				},
				optionsMobile: {
					title: 'statistics of Mobile project status ',
					is3D: true
				}
			});
		}
	}, [statisticsStore]);
	const { tableExample, data, dataWeb, dataMobile, optionsWeb, optionsMobile } = LocalData;
	if (!statisticsStore?.allStats?.allProjectNumbers) return <div>Loading...</div>;
	if (!(tableExample && data && dataWeb && dataMobile && optionsWeb && optionsMobile)) return <div>Loading...</div>;
	return (
		<div className="dashboard_superadmin">
			{' '}
			<CRow>
				<CCol sm={6}>
					<CCard color="info" textColor="white" className="mb-3" style={{ maxWidth: '15rem' }}>
						<CCardHeader>Web Projects</CCardHeader>
						<CCardBody>
							<CCardTitle>{statisticsStore?.allStats?.allProjectNumbers?.web}</CCardTitle>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol sm={6}>
					<CCard color="light" textColor="black" className="mb-3" style={{ maxWidth: '15rem' }}>
						<CCardHeader>Mobile Projects</CCardHeader>
						<CCardBody>
							<CCardTitle>{statisticsStore?.allStats?.allProjectNumbers?.mobile}</CCardTitle>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<div className="row_charts">
				<Chart chartType="PieChart" data={dataWeb} options={optionsWeb} width={'100%'} height={'400px'} />
				<Chart chartType="PieChart" data={dataMobile} options={optionsMobile} width={'100%'} height={'400px'} />
			</div>
			<div>
				{' '}
				<label>
					{' '}
					<strong>Statistics of teams</strong>{' '}
				</label>
				<Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
			</div>
			<label>
				{' '}
				<strong>Table of the employees having higher scores </strong>{' '}
			</label>
			<CTable align="middle" className="mb-0 border" hover responsive>
				<CTableHead color="light">
					<CTableRow>
						<CTableHeaderCell className="text-center">
							<CIcon icon={cilPeople} />
						</CTableHeaderCell>
						<CTableHeaderCell>User</CTableHeaderCell>
						<CTableHeaderCell>Score</CTableHeaderCell>
						<CTableHeaderCell>Encourage</CTableHeaderCell>
					</CTableRow>
				</CTableHead>
				<CTableBody>
					{tableExample.map((item, index) => (
						<CTableRow v-for="item in tableItems" key={index}>
							<CTableDataCell className="text-center">
								<CAvatar size="md" src={item.avatar.src} />
							</CTableDataCell>
							<CTableDataCell>
								<div>{item.user.name}</div>
							</CTableDataCell>

							<CTableDataCell>
								<div className="clearfix">
									<div className="float-start">
										<strong>{item.usage.value}%</strong>
									</div>
								</div>
								<CProgress thin color={item.usage.color} value={item.usage.value} />
							</CTableDataCell>

							<CTableDataCell className="text-center">weekend</CTableDataCell>
						</CTableRow>
					))}
				</CTableBody>
			</CTable>
		</div>
	);
};

superAdminDashboard.propTypes = {
	statisticsStore: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	statisticsStore: state.statistics
});
const mapDispatchToProps = {
	getAllStats
};

export default connect(mapStateToProps, mapDispatchToProps)(superAdminDashboard);
