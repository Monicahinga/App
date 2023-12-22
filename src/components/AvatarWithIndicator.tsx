import React from 'react';
import {View} from 'react-native';
import useThemeStyles from '@hooks/useThemeStyles';
import useThemeIllustrations from '@hooks/useThemeIllustrations';
import * as UserUtils from '@libs/UserUtils';
import Avatar from './Avatar';
import AvatarSkeleton from './AvatarSkeleton';
import Indicator from './Indicator';
import Tooltip from './Tooltip';

type AvatarWithIndicatorProps = {
    /** URL for the avatar */
    source: UserUtils.AvatarSource;

    /** To show a tooltip on hover */
    tooltipText?: string;

    /** A fallback avatar icon to display when there is an error on loading avatar from remote URL. */
    fallbackIcon?: UserUtils.AvatarSource;

    /** Indicates whether the avatar is loaded or not  */
    isLoading?: boolean;
};

function AvatarWithIndicator({source, tooltipText = '', fallbackIcon, isLoading = true}: AvatarWithIndicatorProps) {
    const styles = useThemeStyles();
    const illustrations = useThemeIllustrations();

    return (
        <Tooltip text={tooltipText}>
            <View style={[styles.sidebarAvatar]}>
                {isLoading ? (
                    <AvatarSkeleton />
                ) : (
                    <>
                        <Avatar
                            source={UserUtils.getSmallSizeAvatar(source)}
                            fallbackIcon={fallbackIcon ?? illustrations.FallbackAvatar}
                        />
                        <Indicator />
                    </>
                )}
            </View>
        </Tooltip>
    );
}

AvatarWithIndicator.displayName = 'AvatarWithIndicator';

export default AvatarWithIndicator;
