import { UserContext } from "../../types";

export interface aiContent {
    content?: string;
    topics?: Array<{
        topic: string;
        type: string;
        reason: string;
    }>;
    questions?: Array<{
        question: string;
        type: string;
        context: string;
    }>;
}

export interface  userContent {
    content?: string;
}

export interface Message {
    // type: 'user' | 'ai ';
    id: string;
    user: userContent,
    ai: aiContent
}

// export interface MessageList {
//     message: Message[]
// }


export interface StreamChunk {
    text?: string;
    topics?: Array<{
        topic: string;
        type: string;
        reason: string;
    }>;
    questions?: Array<{
        question: string;
        type: string;
        context: string;
    }>;
}

export interface ExploreViewProps {
    initialQuery?: string;
    onError: (message: string) => void;
    onRelatedQueryClick?: (query: string) => void;
    userContext: UserContext;
}