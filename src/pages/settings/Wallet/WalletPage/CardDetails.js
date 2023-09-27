import React from 'react';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import * as Expensicons from '../../../../components/Icon/Expensicons';
import MenuItemWithTopDescription from '../../../../components/MenuItemWithTopDescription';
import Clipboard from '../../../../libs/Clipboard';
import useLocalize from '../../../../hooks/useLocalize';
import usePrivatePersonalDetails from '../../../../hooks/usePrivatePersonalDetails';
import ONYXKEYS from '../../../../ONYXKEYS';
import * as CartUtils from '../../../../libs/CardUtils';

const propTypes = {
    /** Card number */
    pan: PropTypes.string,

    /** Card expiration date */
    expiration: PropTypes.string,

    /** 3 digit code */
    cvv: PropTypes.string,

    /** User's private personal details */
    privatePersonalDetails: PropTypes.shape({
        /** User's home address */
        address: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
            zip: PropTypes.string,
            country: PropTypes.string,
        }),
    }),
};

const defaultProps = {
    pan: '',
    expiration: '',
    cvv: '',
    privatePersonalDetails: {
        address: {
            street: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        },
    },
};

function CardDetails({pan, expiration, cvv, privatePersonalDetails}) {
    usePrivatePersonalDetails();
    const {translate} = useLocalize();

    const handleCopyToClipboard = () => {
        Clipboard.setString(pan);
    };

    return (
        <>
            <MenuItemWithTopDescription
                description={translate('cardPage.cardDetails.cardNumber')}
                title={pan}
                iconRight={Expensicons.Copy}
                shouldShowRightIcon
                interactive={false}
                onIconRightPress={handleCopyToClipboard}
                iconRightAccessibilityLabel={translate('cardPage.cardDetails.copyCardNumber')}
            />
            <MenuItemWithTopDescription
                description={translate('cardPage.cardDetails.expiration')}
                title={expiration}
                interactive={false}
            />
            <MenuItemWithTopDescription
                description={translate('cardPage.cardDetails.cvv')}
                title={cvv}
                interactive={false}
            />
            <MenuItemWithTopDescription
                description={translate('cardPage.cardDetails.address')}
                title={CartUtils.getFormattedAddress(privatePersonalDetails)}
                interactive={false}
            />
        </>
    );
}

CardDetails.displayName = 'CardDetails';
CardDetails.propTypes = propTypes;
CardDetails.defaultProps = defaultProps;

export default withOnyx({
    privatePersonalDetails: {
        key: ONYXKEYS.PRIVATE_PERSONAL_DETAILS,
    },
})(CardDetails);
