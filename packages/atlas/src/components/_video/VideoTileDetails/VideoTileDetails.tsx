import { FC, PropsWithChildren } from 'react'
import { To } from 'react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { ListItemProps } from '@/components/ListItem'
import { Text } from '@/components/Text'
import { SvgActionMore } from '@/components/_icons'
import { SkeletonLoader } from '@/components/_loaders/SkeletonLoader'
import { ContextMenu } from '@/components/_overlays/ContextMenu'
import { cVar, transitions } from '@/styles'
import { formatVideoDate } from '@/utils/video'

import {
  ChannelTitle,
  KebabMenuButtonIcon,
  PlaylistButton,
  StyledAvatar,
  StyledLink,
  VideoDetailsContainer,
  VideoInfoContainer,
  VideoMetaContainer,
  VideoTitle,
  Views,
} from './VideoTileDetails.styles'

export type VideoDetailsVariant = 'withoutChannel' | 'withChannelName' | 'withChannelNameAndAvatar'

export type VideoTileDetailsProps = {
  videoTitle?: string | null
  onVideoTitleClick?: () => void
  videoSubTitle?: string | null
  videoHref?: string
  views?: number | null
  createdAt?: Date | null
  channelTitle?: string | null
  channelAvatarUrl?: string | null
  channelHref?: string
  onChannelAvatarClick?: () => void
  loadingAvatar?: boolean
  loading?: boolean
  size?: 'small' | 'medium'
  kebabMenuItems?: ListItemProps[]
  variant?: VideoDetailsVariant
  type?: 'video' | 'playlist'
  playlistUrl?: string
}

export const VideoTileDetails: FC<VideoTileDetailsProps> = ({
  videoTitle,
  onVideoTitleClick,
  videoSubTitle,
  videoHref,
  views,
  createdAt,
  channelTitle,
  channelHref,
  onChannelAvatarClick,
  size = 'medium',
  channelAvatarUrl,
  loadingAvatar,
  loading,
  kebabMenuItems = [],
  variant = 'withChannelNameAndAvatar',
  type = 'playlist',
  playlistUrl,
}) => {
  return (
    <VideoDetailsContainer>
      {variant === 'withChannelNameAndAvatar' && (
        <StyledAvatar
          assetUrl={channelAvatarUrl}
          loading={loadingAvatar}
          onClick={onChannelAvatarClick}
          smallGap={size === 'small'}
        />
      )}
      <SwitchTransition>
        <CSSTransition
          timeout={parseInt(cVar('animationTimingFast', true))}
          key={String(loading)}
          classNames={transitions.names.fade}
        >
          <VideoInfoContainer>
            {loading ? (
              <SkeletonLoader height={24} width="60%" />
            ) : (
              <LinkWrapper to={videoHref}>
                <VideoTitle as="h3" onClick={onVideoTitleClick} variant={size === 'medium' ? 'h400' : 'h300'}>
                  {videoTitle}
                </VideoTitle>
              </LinkWrapper>
            )}
            <VideoMetaContainer>
              {variant !== 'withoutChannel' &&
                (loading ? (
                  <SkeletonLoader height={16} width="100%" bottomSpace={8} />
                ) : (
                  <LinkWrapper to={channelHref}>
                    <ChannelTitle variant="t200" color="colorText" as="p">
                      {channelTitle}
                    </ChannelTitle>
                  </LinkWrapper>
                ))}
              {loading ? (
                <SkeletonLoader height={variant === 'withoutChannel' ? 20 : 16} width="100%" />
              ) : (
                <>
                  {type === 'video' ? (
                    <Text variant="t200" color="colorText" as="p">
                      {videoSubTitle
                        ? videoSubTitle
                        : createdAt && (
                            <>
                              {formatVideoDate(createdAt)} •{' '}
                              <Views as="span" value={views ?? 0} format="short" color="colorText" />
                              &nbsp;views
                            </>
                          )}
                    </Text>
                  ) : (
                    <PlaylistButton variant="tertiary" size="small" to={playlistUrl}>
                      View playlist details
                    </PlaylistButton>
                  )}
                </>
              )}
            </VideoMetaContainer>
          </VideoInfoContainer>
        </CSSTransition>
      </SwitchTransition>
      {kebabMenuItems.length > 0 && !loading && (
        <ContextMenu
          placement="bottom-end"
          items={kebabMenuItems}
          trigger={
            <KebabMenuButtonIcon
              onClick={() => null}
              icon={<SvgActionMore />}
              variant="tertiary"
              size="small"
              smallGap={size === 'small'}
            />
          }
        />
      )}
    </VideoDetailsContainer>
  )
}

type LinkWrapperProps = PropsWithChildren<{
  to?: To
}>
const LinkWrapper: FC<LinkWrapperProps> = ({ children, to }) => {
  if (to) {
    return <StyledLink to={to}>{children}</StyledLink>
  }
  return <>{children}</>
}
