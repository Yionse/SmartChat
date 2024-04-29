import {TUserInfo} from '@/apis/types';
import {makeAutoObservable} from 'mobx';

export interface TMessageItem {
  isMe: boolean;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export type TMessageList = {
  qq: string;
  messagesItem: TMessageItem[];
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  userInfo: TUserInfo;
};

export class MessagesStore {
  constructor() {
    makeAutoObservable(this);
  }

  contactList: TMessageList[] = [
    {
      qq: '44444',
      messagesItem: [
        {
          isMe: true,
          message: '你好，我是智能聊天机器人小智，很高兴为您服务。',
          timestamp: '1714370613088',
          isRead: true,
        },
        {
          isMe: true,
          message: '你好，我是智能聊天机器人小智，很高兴为您服务。123123',
          timestamp: '1714370613088',
          isRead: true,
        },
      ],
      unreadCount: 1,
      lastMessage: '这是这是',
      lastMessageTime: '1714147200000',
      userInfo: {
        qq: '11111',
        userName: '一一一一一',
        sex: '女',
        userImg: 'https://q1.qlogo.cn/g?b=qq&nk=2458015575&s=5',
        hobbyList: '滑板-钓鱼-书法',
        location: '未知',
        signature: '111',
      },
    },
  ];

  currentQQ: string = '';

  init(message: TMessageList[]) {
    this.contactList = message;
  }

  getCurrentContextMsg(qq: string) {
    // 表示进入了聊天界面
    const currentChat = this.getCurrentChatContext(qq);
    if (currentChat) {
      currentChat.unreadCount = 0;
      return currentChat.messagesItem;
    }
  }

  getCurrentChatContext(qq: string): TMessageList {
    this.currentQQ = qq;
    return this.contactList.find(item => item.qq === qq) as any;
  }

  sendMessage(content: string, qq: string) {
    const currentChat = this.getCurrentChatContext(qq);
    currentChat.lastMessage = content;
    currentChat.lastMessageTime = +new Date() + '';
    currentChat.messagesItem.push({
      isMe: true,
      message: content,
      timestamp: +new Date() + '',
      isRead: false,
    });
  }
}

export const messagesStore = new MessagesStore();
