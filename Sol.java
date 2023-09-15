public class Sol{
    public static void main(String[] args){
        int nums[] = {4,5,6,7,0,1,2};
        int p = binarySearch(nums, 0, nums.length, nums.length/2);
        System.out.println("P: "+p);
    }

    public static int binarySearch(int arr[], int start, int end, int index){
        
        if(arr[index+1]>arr[index] && arr[index-1]>arr[index]){
            return index;
        }

        binarySearch(arr, start, index, (start+index)/2);
        binarySearch(arr, index, end, (index+end)/2);
        return -1;
        
    }
}

public class SingletonClass{
    private SingletonClass singletonClass;
    public static SingletonClass createInstance(){
        if(singletonClass!=null){
            singletonClass = new SingletonClass();
        }

        return singletonClass;
    }
}