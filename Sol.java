public class Sol {

    public static int countOccur(String parent, String sub) {
        int answer = 0;
        int lastIndex = 0;

        while (lastIndex != -1) {
            lastIndex = parent.indexOf(sub, lastIndex);
            if (lastIndex != -1) {
                answer++;
                lastIndex += sub.length();
            }
        }

        return answer;
    }

    public static void main(String[] args) {
        String parent = "hello world, hello universe, hello hello";
        String sub = "hello";

        int occurrenceCount = countOccur(parent, sub);
        System.out.println("Occurrences of '" + sub + "': " + occurrenceCount);
    }
}
