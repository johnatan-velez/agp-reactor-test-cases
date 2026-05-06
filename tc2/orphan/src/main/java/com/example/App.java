package com.example;
import com.google.common.base.Strings;
public class App {
    public static String pad(String s, int n) {
        return Strings.padEnd(s, n, ' ');
    }
}
