import React, { Suspense } from 'react';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import routes from '../routes';
import { Route } from 'react-router';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';

const AppContent = props => {
	const { currentUser } = props;
	const location = useLocation();
	return (
		<CContainer lg>
			<Suspense fallback={<CSpinner color="primary" />}>
				{routes.map((route, idx) => {
					if (location.pathname === route.path) {
						if (!route.access.includes(currentUser.role)) return <Redirect to="/login" />;
					}
					return (
						<Route
							key={idx}
							path={route.path}
							exact={route.exact}
							name={route.name}
							component={route.element}
						/>
					);
				})}
			</Suspense>
		</CContainer>
	);
};

export default React.memo(AppContent);
