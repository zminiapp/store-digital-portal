import API from '@/constants/api';
import { ResponseData } from '@/constants/interface';
import { postWithPath } from '@/utils/http';

const HomeService = {
    logTrack: (params: any): Promise<ResponseData<boolean>> => {
        return postWithPath(API.HOME.POST.LOG_TRACK, {}, params);
    },
};

export default HomeService;
